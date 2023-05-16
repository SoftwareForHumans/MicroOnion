from Refactoring import Refactoring
from ServiceRepresentation import ServiceRepresentation
from RefactoringRepresentation import RefactoringRepresentation
class BreakDependencies:
    def __init__(self, project_name, services, dependencies, initial_refactoring, refactoring_representation):
        self.project_name = project_name
        self.services = services
        self.dependencies = dependencies
        self.to_remove = []
        self.initial_refactoring = initial_refactoring
        self.refactoring_representation = refactoring_representation

    def get_service_by_id(self, id):
        for i in self.services:
            if str(i.get_id()) == id:
                return i
    
    def add_to_remove(self, to_add):
        if isinstance(to_add[0], list):
            self.to_remove.extend(to_add)
        else:
            self.to_remove.append(to_add)
    def clean_to_remove(self):
        self.to_remove = []

    def break_dependencies(self, strategy = None):
        dependencies = dict(sorted(self.dependencies.items(), key=lambda x: len(x[1]), reverse=False))

        refactoring_representation = RefactoringRepresentation(self.project_name)
        refactoring_representation.set_services(self.services)
        refactoring_representation.create_new_snapshot()

        for microservice, deps in dependencies.items():
            print(f"\nEXTRACT MICROSERVICE {microservice}")
            current_refactoring = self.initial_refactoring.add_refactoring(Refactoring("EXTRACT MICROSERVICE", self.initial_refactoring.get_level() + 1, int(microservice), -1))
            for k, v in deps.items():
                print(f"---\nBreaking dependencies with microservice {k} \n")
                self.break_dependency_file_by_file(microservice, k, v, current_refactoring)
                
                if microservice in dependencies[k].keys():
                    print(f"\nBreaking dependencies of microservice {k} with microservice {microservice}\n")
                    self.break_dependency_file_by_file(k, microservice, dependencies[k][microservice], current_refactoring)
                
            refactoring_representation.set_services(self.get_service_by_id(microservice))
            refactoring_representation.create_new_snapshot()
            print("\n------------------------------------\n")

        for i in self.services:
            i.clean_dependencies()
        refactoring_representation.set_services(self.services)
        refactoring_representation.create_new_snapshot()


    def break_dependency_file_by_file(self, microservice, k, v, current_refactoring):
        service = self.get_service_by_id(microservice)
        order = {"databaseDependency": 0, "variableType": 1, "methodVariable": 2, "methodInvocation": 3, "interface": 4, "implements": 4, "extends": 4, "imports": 5}
        self.clean_to_remove()

        for file, dep in v.items():
            for d in dep:
                dependent_file = d[0]
                types = d[1:]
                types.sort(key=lambda c: order[c])

                try:
                    if "databaseDependency" in types:
                        types, res = self.break_database_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if  "variableType" in types:
                        types, res = self.break_type_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "methodVariable" in types:
                        types, res = self.break_type_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "methodInvocation" in types:
                        types, res = self.break_method_invocation_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "extends" in types or "implements" in types:
                        types, res = self.break_extends_implements_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "imports" in types:
                        types, res = self.break_import_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                except Exception as e:
                        print("Error occurred: ", e)
     
        for i, j, m , l in self.to_remove:
            service.remove_dependency(i, j, m, l)

        
    
    def break_database_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        dependency = microservice.get_class_database_dependecy(file, dependent_file)

        # in spring it corresponds to the annotation in the entities so we don't need to check if the classes are entities or not
        # if a join table was defined then the microservice is the owner of the data
        if ((dependency[0] == "ManyToMany" or dependency[0] == "OneToOne") and len(dependency) > 2) or dependency[0] == "ManyToOne": 
            print("CHANGE DATA OWNERSHIP")
            current_refactoring = current_refactoring.add_refactoring(Refactoring("CHANGE DATA OWNERSHIP", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))
            

        print(f"MOVE FOREIGN-KEY RELATIONSHIP TO CODE - {file}/{dependent_file}")

        notes = {}
        notes["relationship"] = dependency[0]
        notes["entities"] = []
        notes["interfaces"] = []
        dependent_service = self.get_service_by_id(dependent_microservice)
        entity_name = dependent_file.split('.')[-1]
        if microservice.check_if_class_is_entity(file):
            notes["entities"].append(file)
            microservice.add_interface(file + "Interface")
            notes["interfaces"].append(file + "Interface")
        if dependent_service.check_if_class_is_entity(entity_name):
            notes["entities"].append(entity_name)
            dependent_service.add_interface(entity_name+ "Interface")
            notes["interfaces"].append(entity_name + "Interface")
            
        

        #TODO: change methods to use these interfaces
        #TODO: check local method call 

        current_refactoring.add_refactoring(Refactoring("MOVE FOREIGN-KEY RELATIONSHIP TO CODE", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, notes))
        types.remove('databaseDependency')

        return types, [dependent_microservice, file, dependent_file, "databaseDependency"]

        
        
    
    def break_method_invocation_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):  
        print(f"CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL - {file}/{dependent_file}")
        notes = {}
        notes["protocol"] = "HTTP"

        current_refactoring.add_refactoring(Refactoring("CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))
        #TODO: make changes
        types.remove('methodInvocation')
        return types, [dependent_microservice, file, dependent_file, "methodInvocation"]
        

    def break_type_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"DATA TYPE DEPENDENCY - {file}/{dependent_file}")

        to_append = []
        res = []
        if ("methodInvocation" in types and "variableType" in types):
            to_append.append("methodInvocation")
            to_append.append("variableType")
        elif ("methodInvocation" in types and "methodVariable" in types):
            to_append.append("methodInvocation")
            to_append.append("methodVariable")
        elif ("variableType" in types and "methodVariable" in types):
            to_append.append("variableType")
            to_append.append("methodVariable")
        elif "methodInvocation" in types and "methodVariable" in types and "variableType" in types:
            to_append.append("methodInvocation")
            to_append.append("variableType")
            to_append.append("methodVariable")
        elif "variableType" in types:
            to_append.append("variableType")
        elif  "methodInvocation" in types:
            to_append.append("methodInvocation")
        elif "methodVariable" in types:
            to_append.append("methodVariable")

        notes = {}
        notes["interfaces"] = []
        notes_dtos = {"created": []}
        createdDTO = False
        if "variableType" in to_append or "methodVariable" in to_append: # we will only create a DTO for this dependency once
            object_name = dependent_file.split(".")[-1]
            dto_name = object_name + "DTO"

            microservice.add_dto(dto_name)
            interface_name  = object_name + "DTOInterface"
            microservice.add_interface(interface_name)

            if dto_name not in notes_dtos["created"]:
                notes_dtos["created"].append(dto_name)
            if interface_name not in notes["interfaces"]:
                notes["interfaces"].append(interface_name)
            if "variableType" in to_append:
                types.remove("variableType")
                res.append([dependent_microservice, file, dependent_file, "variableType"])
            if "methodVariable" in to_append:
                types.remove("methodVariable")
                res.append([dependent_microservice, file, dependent_file, "methodVariable"])
            createdDTO = True

        current_refactoring = current_refactoring.add_refactoring(Refactoring("BREAK DATA TYPE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, notes))
        if createdDTO:
            current_refactoring.add_refactoring(Refactoring("CREATE DATA TRANSFER OBJECT", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, notes_dtos))
            

        if "methodInvocation" in to_append:
            # TODO: add method invocation to notes
            [types, r] = self.break_method_invocation_dependency(microservice, dependent_microservice, file, dependent_file, types, current_refactoring)
            res.append(r)
           
                    


        
        return types, res
    
    def break_import_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"IMPORT DEPENDENCY - {file}/{dependent_file}")

        file_name = dependent_file.split('.')[-1]
        notes = {}

        microservice.add_new_class(file_name)
        notes["new_classes"] = [file_name]

        current_refactoring.add_refactoring(Refactoring("IMPORT DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, notes))

        types.remove('imports')
        return types, [dependent_microservice, file, dependent_file, "imports"]
    
    def break_extends_implements_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"FILE DEPENDENCY - {file}/{dependent_file}")
        m = self.get_service_by_id(dependent_microservice)
        is_interface = m.check_if_class_is_interface(dependent_file)
        file_name = dependent_file.split('.')[-1]
        notes = {}
        if is_interface:
            microservice.add_interface(file_name)
            notes["interfaces"] = [file_name]
        else:
            microservice.add_new_class(file_name)
            notes["new_classes"] = [file_name]

        current_refactoring.add_refactoring(Refactoring("FILE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, notes))
        
        type = "implements" if is_interface else "extends"
        types.remove(type)
        return types, [dependent_microservice, file, dependent_file, type]
    

