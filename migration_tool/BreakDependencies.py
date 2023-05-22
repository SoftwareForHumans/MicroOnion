from Refactoring import Refactoring
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
            if i.get_id() == id:
                return i
    
    def add_to_remove(self, to_add):
        if isinstance(to_add[0], list):
            self.to_remove.extend(to_add)
        else:
            self.to_remove.append(to_add)

    def clean_to_remove(self):
        self.to_remove = []
    
    def update_service(self, service):
        for idx, i in enumerate(self.services):
            if i.get_id() == service.get_id():
                self.services[idx] = service


    def break_dependencies(self, strategy = None):
        dependencies = dict(sorted(self.dependencies.items(), key=lambda x: len(x[1]), reverse=False))
        
        for microservice, deps in dependencies.items():
            service_ids = []
            print(f"\nEXTRACT MICROSERVICE {microservice}")
            service = self.get_service_by_id(microservice)
            current_refactoring = self.initial_refactoring.add_refactoring(Refactoring("EXTRACT MICROSERVICE", self.initial_refactoring.get_level() + 1, int(microservice), -1))
            for k, v in deps.items():
                print(f"---\nBreaking dependencies with microservice {k} \n")
                dependent_service = self.get_service_by_id(k)
                self.break_dependency_file_by_file(service, dependent_service, v, current_refactoring)
                service_ids.append(k)
   
            for m, d in dependencies.items():
                if microservice in d.keys():
                    d_service = self.get_service_by_id(m)
                    print(f"\nBreaking dependencies of microservice {m} with microservice {microservice}\n")
                    self.break_dependency_file_by_file(d_service, service, dependencies[m][microservice], current_refactoring)
                    service_ids.append(m)

            service_ids.append(microservice)
            service_ids = set(service_ids)
            
            services = []
            for i in service_ids:
                services.append(self.get_service_by_id(i))

            service.clean_dependencies()    
            self.update_service(service)
            self.refactoring_representation.set_services(services)
            self.refactoring_representation.create_new_snapshot()

            print("\n------------------------------------\n")



    def break_dependency_file_by_file(self, microservice, k, v, current_refactoring):
        order = {"databaseDependency": 0, "variableType": 1, "methodVariable": 2, "methodInvocation": 3, "interface": 4, "implements": 4, "extends": 4, "imports": 5}
        self.clean_to_remove()

        for file, dep in v.items():
            for d in dep:
                dependent_file = d[0]
                types = d[1:]
                types.sort(key=lambda c: order[c])

                try: 
                    if "databaseDependency" in types:
                        types, res = self.handle_database_dependency(microservice, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if  "variableType" in types or "methodVariable" in types:
                        types, res = self.handle_type_dependency(microservice, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "methodInvocation" in types:
                        types, res = self.handle_method_invocation_dependency(microservice, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "extends" in types or "implements" in types:
                        types, res = self.handle_extends_implements_dependency(microservice, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                    if "imports" in types:
                        types, res = self.handle_import_dependency(microservice, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                except Exception as e:
                        print("Error occurred: ", e)

        for i, j, m , l in self.to_remove:
            microservice.remove_dependency(i, j, m, l)

        return current_refactoring
    
    def handle_database_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        dependency = microservice.get_class_database_dependecy(file, dependent_file)

        # in spring it corresponds to the annotation in the entities so we don't need to check if the classes are entities or not
        # if a join table was defined then the microservice is the owner of the data
        if ((dependency[0] == "ManyToMany" or dependency[0] == "OneToOne") and len(dependency) > 2) or dependency[0] == "ManyToOne": 
            print("CHANGE DATA OWNERSHIP")
            notes = {}
            notes["entity"]= file
            current_refactoring = current_refactoring.add_refactoring(Refactoring("CHANGE DATA OWNERSHIP", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))
            

        print(f"MOVE FOREIGN-KEY RELATIONSHIP TO CODE - {file}/{dependent_file}")

        notes = {}
        notes["relationship"] = dependency[0]
        notes["entities"] = []
        notes["interfaces"] = []
        entity_name = dependent_file.split('.').pop()
        if microservice.check_if_class_is_entity(file):
            notes["entities"].append(file)
            microservice.add_interface(file + "Interface")
            notes["interfaces"].append(file + "Interface")
        if dependent_microservice.check_if_class_is_entity(entity_name):
            notes["entities"].append(entity_name)
            dependent_microservice.add_interface(entity_name + "Interface")
            notes["interfaces"].append(entity_name + "Interface")
        

        current_refactoring = current_refactoring.add_refactoring(Refactoring("MOVE FOREIGN-KEY RELATIONSHIP TO CODE", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))
        types.remove('databaseDependency')

        res = []
        res.append([dependent_microservice.get_id(), file, dependent_file, "databaseDependency"])

        # if there are methodInvocations for the same dependency, then the change to a service call is a subrefactoring of this one
        if "methodInvocation" in types:
            types, r = self.handle_method_invocation_dependency(microservice, dependent_microservice, file, dependent_file, types, current_refactoring)
            res.append(r)

        return types, res

        
        
    
    def handle_method_invocation_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):  
        print(f"CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL - {file}/{dependent_file}")
        
        class_name = dependent_file.split(".").pop()
        method = microservice.get_method_from_methodInvocation(file, dependent_file)

        notes = {}
        notes["method"] = method
        notes["protocol"] = "HTTP"
        notes["type"] = "synchronous"
        notes["target"] = class_name
        notes["new_classes"] = [class_name + "RequestInterfaceImpl", class_name + "HandleRequest"]
        notes["interfaces"] = [class_name + "RequestInterface"]
        microservice.add_interface(class_name + "RequestInterface")
        microservice.add_new_class(class_name + "RequestInterfaceImpl")
        dependent_microservice.add_new_class(class_name + "HandleRequest")
        microservice.add_service_call("synchronous", "HTTP", method, dependent_microservice.get_id())

        current_refactoring.add_refactoring(Refactoring("CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))
        
        types.remove('methodInvocation')
        return types, [dependent_microservice.get_id(), file, dependent_file, "methodInvocation"]
        

    def handle_type_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
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
        notes["file"] = file
        notes["dependent_file"] = dependent_file
        notes["dependencies"] = to_append
        
        notes_dtos = {"created": []}

        if "variableType" in to_append or "methodVariable" in to_append: # we will  need only create one DTO for this dependency 
            object_name = dependent_file.split(".").pop()
            dto_name = object_name + "DTO"
            ret = microservice.add_dto(dto_name)

            if ret != -1:
                if dto_name not in notes_dtos["created"]:
                    notes_dtos["created"].append(dto_name)

            if "variableType" in to_append:
                types.remove("variableType")
                res.append([dependent_microservice.get_id(), file, dependent_file, "variableType"])
            if "methodVariable" in to_append:
                types.remove("methodVariable")
                res.append([dependent_microservice.get_id(), file, dependent_file, "methodVariable"])
                
        if "methodInvocation" in to_append:
            notes["interfaces"] = []
            interface_name  = object_name + "DTOInterface"
            ret = microservice.add_interface(interface_name)
            if ret != -1:
                if interface_name not in notes["interfaces"]:
                    notes["interfaces"].append(interface_name)

        current_refactoring = current_refactoring.add_refactoring(Refactoring("BREAK DATA TYPE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))
        
        if len(notes_dtos["created"]) > 0 :
            current_refactoring.add_refactoring(Refactoring("CREATE DATA TRANSFER OBJECT", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes_dtos))
            
        if "methodInvocation" in to_append:
            [types, r] = self.handle_method_invocation_dependency(microservice, dependent_microservice, file, dependent_file, types, current_refactoring)
            res.append(r)
     
        return types, res
    
    def handle_import_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"IMPORT DEPENDENCY - {file}/{dependent_file}")

        file_name = dependent_file.split('.').pop()
        notes = {}

        microservice.add_new_class(file_name)
        notes["new_classes"] = [file_name]

        current_refactoring.add_refactoring(Refactoring("IMPORT DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))

        types.remove('imports')
        return types, [dependent_microservice.get_id(), file, dependent_file, "imports"]
    
    def handle_extends_implements_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"FILE DEPENDENCY - {file}/{dependent_file}")
        
        is_interface = dependent_microservice.check_if_class_is_interface(dependent_file)
        file_name = dependent_file.split('.').pop()
        notes = {}
        if is_interface:
            microservice.add_interface(file_name)
            notes["interfaces"] = [file_name]
        else:
            microservice.add_new_class(file_name)
            notes["new_classes"] = [file_name]

        current_refactoring.add_refactoring(Refactoring("FILE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice.get_id(), notes))
        
        type = "implements" if is_interface else "extends"
        types.remove(type)
        return types, [dependent_microservice.get_id(), file, dependent_file, type]
    

