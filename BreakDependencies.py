from Refactoring import Refactoring
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
            current_refactoring = self.initial_refactoring.add_refactoring(Refactoring("EXTRACT MICROSERVICE", self.initial_refactoring.get_level() + 1))
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
                    if "interface" in types or "extends" in types or "implements" in types:
                        pass
                    if "imports" in types:
                        types, res = self.break_import_dependency(service, k, file, dependent_file, types, current_refactoring)
                        self.add_to_remove(res)
                except Exception as e:
                        print("Error occurred: ", e)
     
        for i, j, m , l in self.to_remove:
            service.remove_dependency(i, j, m, l)

        
    
    def break_database_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        dependency = microservice.get_class_database_dependecy(file, dependent_file)
        print(dependency)
        if ((dependency[0] == "ManyToMany" or dependency[0] == "OneToOne") and len(dependency) > 2) or dependency[0] == "ManyToOne": # a join table was defined so this microservice is the owner of the data
            print("CHANGE DATA OWNERSHIP")
            current_refactoring = current_refactoring.add_refactoring(Refactoring("CHANGE DATA OWNERSHIP", current_refactoring.get_level() + 1))
            

        #which one comes next

        print("MOVE FOREIGN-KEY RELATIONSHIP TO CODE")
        current_refactoring.add_refactoring(Refactoring("MOVE FOREIGN-KEY RELATIONSHIP TO CODE", current_refactoring.get_level() + 1))
        # print("Split Table")
        # print("Replicate Data")

        types.remove('databaseDependency')
        return types, [dependent_microservice, file, dependent_file, "databaseDependency"]

        
        
    
    def break_method_invocation_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):  
        #decide between synchornous or asynchronous
        print(f"CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL - {file}/{dependent_file}")
        print("By default this should be a synchronous call, however if you don't need an instant response or don't want a service to wait for the response it can be asynchronous\n")
        
        current_refactoring.add_refactoring(Refactoring("CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL", current_refactoring.get_level() + 1 ))

        types.remove('methodInvocation')
        return types, [dependent_microservice, file, dependent_file, "methodInvocation"]
        

    def break_type_dependency(self, microservice, dependent_microservice, file, dependent_file, types, current_refactoring):
        print(f"DATA TYPE DEPENDENCY - {file}/{dependent_file}")
        print("By default we assume the data type is owned and exist only on the microservice where it was first defined.")
        print("However, there are two other options that can be used keeping it in both microservices: to use one as a proxy or to do replication\n")

        current_refactoring.add_refactoring(Refactoring("DATA TYPE DEPENDENCY", current_refactoring.get_level() + 1))

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
        
        current_refactoring.add_refactoring(Refactoring("IMPORT DEPENDENCY", current_refactoring.get_level() + 1))

        types.remove('imports')
        return types, [dependent_microservice, file, dependent_file, "imports"]