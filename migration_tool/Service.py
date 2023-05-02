import itertools
class Service:

    newid = itertools.count()

    def __init__(self):
        self.id = next(self.newid)
        self.file_names = list()
        self.classes = list()
        self.dependencies = {}

    def get_id(self):
        return self.id

    def get_dependencies(self):
        return self.dependencies

    def add_files(self, files):
        self.file_names.extend(files)

    def get_files(self):
        return self.file_names

    def add_classes(self, classes):
        self.classes.extend(classes)
    
    def get_classes(self):
        return self.classes

    def has_file(self, name):
        return name in self.file_names
    
    def analyze_dependencies(self, services, classes):
        dependencies = {}
        for i in self.classes:
            dep1 = i.analyze_dependencies(classes)
            dependencies[i.get_name()] = dep1 #{className : dependencies}
            
        dep = {}
        for class_name, d in dependencies.items():
            for c in d:
                for s in services:
                    if s.has_file(c[0]): 
                        service = str(s.get_id())
                        if service in dep.keys() and class_name in dep[service].keys():
                            dep[service][class_name].append(c) 
                        elif service in dep.keys() and class_name not in dep[service].keys():
                            dep[service][class_name] = [c]
                        elif service != str(self.id) and service not in dep.keys():
                            dep[service] = {}
                            dep[service][class_name] = [c]

        self.dependencies = dep
        return dep

    def remove_dependency(self, service, file, dependency, type):
        for i in self.dependencies[service][file]:
            if i[0] == dependency:
                if len(i) == 2:
                    self.dependencies[service][file].remove(i)
                else:
                    i.remove(type)
            
    def clean_dependencies(self):
        for i in self.dependencies.keys():
            self.dependencies[i] = dict(filter(lambda x: len(x[1]) > 0, self.dependencies[i].items()))
        
        self.dependencies = dict(filter(lambda x: len(x[1]) > 0, self.dependencies.items()))
   
    def get_class_database_dependecy(self, class_name, database_dependency):
        for i in self.classes:
            if i.get_name() == class_name:
                return i.get_database_dependency(database_dependency)
            
    def check_if_class_is_interface(self, class_name):
        for i in self.classes:
            if i.get_name() == class_name:
                return i.is_interface()