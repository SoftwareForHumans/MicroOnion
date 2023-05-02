from Refactoring import Refactoring
from ServiceRepresentation import ServiceRepresentation

class BreakDependencies:
    def __init__(self, services, dependencies, initial_refactoring, refactoring_representation):
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
        for microservice, deps in dependencies.items():
            print(f"\nEXTRACT MICROSERVICE {microservice}")
            current_refactoring = self.initial_refactoring.add_refactoring(Refactoring("EXTRACT MICROSERVICE", self.initial_refactoring.get_level() + 1, int(microservice), -1))
            for k, v in deps.items():
                print(f"---\nBreaking dependencies with microservice {k} \n")
                self.break_dependency_file_by_file(microservice, k, v, current_refactoring)
                
                if microservice in dependencies[k].keys():
                    print(f"\nBreaking dependencies of microservice {k} with microservice {microservice}\n")
                    self.break_dependency_file_by_file(k, microservice, dependencies[k][microservice], current_refactoring)

            print("\n------------------------------------\n")

        for i in self.services:
            i.clean_dependencies()
        


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

        # if a join table was defined then the microservice is the owner of the data
        if ((dependency[0] == "ManyToMany" or dependency[0] == "OneToOne") and len(dependency) > 2) or dependency[0] == "ManyToOne": 
            print("CHANGE DATA OWNERSHIP")
            current_refactoring = current_refactoring.add_refactoring(Refactoring("CHANGE DATA OWNERSHIP", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))
            

        #which one comes next
        print("MOVE FOREIGN-KEY RELATIONSHIP TO CODE")
        current_refactoring.add_refactoring(Refactoring("MOVE FOREIGN-KEY RELATIONSHIP TO CODE", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice, dependency[0]))
        # print("Split Table")
        # print("Replicate Data")

        #ver se sao objetos da base de dados, do tipo entity
        
        types.remove('databaseDependency')
        return types, [dependent_microservice, file, dependent_file, "databaseDependency"]

        
        
    
    def break_method_invocation_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):  
        #decide between synchornous or asynchronous
        print(f"CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL - {file}/{dependent_file}")
 
        
        current_refactoring.add_refactoring(Refactoring("CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))

        types.remove('methodInvocation')
        return types, [dependent_microservice, file, dependent_file, "methodInvocation"]
        

    def break_type_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"DATA TYPE DEPENDENCY - {file}/{dependent_file}")

        current_refactoring.add_refactoring(Refactoring("DATA TYPE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))

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

        for i in to_append:
            types.remove(i)
            res.append([dependent_microservice, file, dependent_file, i]) 

        return types, res
    
    def break_import_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print("We identified a dependency in the file " + file +  " with the file " + dependent_file + " in the imports. However, we aren't able to fix it")
        
        current_refactoring.add_refactoring(Refactoring("IMPORT DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))

        types.remove('imports')
        return types, [dependent_microservice, file, dependent_file, "imports"]
    
    def break_extends_implements_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"FILE DEPENDENCY - {file}/{dependent_file}")
        m = self.get_service_by_id(dependent_microservice)
        is_interface = m.check_if_class_is_interface(dependent_file)
        current_refactoring.add_refactoring(Refactoring("FILE DEPENDENCY", current_refactoring.get_level() + 1, microservice.get_id(), dependent_microservice))
        
        type = "implements" if is_interface else "extends"
        types.remove(type)
        return types, [dependent_microservice, file, dependent_file, type]
    

    def implement_move_foreign_key(self, microservice, dependent_microservice, file, dependent_file, current_refactoring, dependency):


        # - remove foreign key constraints - remover anotação
        # - in th entity class creare an instance variable that represents the other entity involved 
        # - create two separate databases
        # - create an interface for each of these database that implements the methods of data manipulation - criar interface para a entidade
        # - identify the methods tha use/manipulate data from different databases and change them to use the newly created interfaces 


        # - change local methods call to service calls using the primary key as a parameter
        pass


    def implement_change_local_methods_call_synchronous(self, microservice, dependent_microservice, file, dependent_file, current_refactoring):
        # decide the protocol
        # change the calls
        # create an interface
        # create a class that implements that interface
        # create a variabke of the interface type
        # store necessary microservice information
        # change the other microservice to receive the requestz
        # create a class that defines the resource paths
        # create a class to process the requestz requests# add methods to entity to perform the actions
        pass

    def implement_data_transfer_object(self, microservice, dependent_microservice, file, dependent_file, current_refactoring):
        # create an entity with the necessary data 
        pass
    
    def implement_data_type_dependency(self, microservice, dependent_microservice, file, dependent_file, current_refactoring):
        # idenitfy where it is used
        # change local method call to service call
        #data transfer object
        # create an interface with the same as the data type that defines the methods invocations identified
        pass
