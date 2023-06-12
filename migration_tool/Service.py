import itertools
from ServiceCall import ServiceCall
class Service:

    newid = itertools.count()

    def __init__(self, id=None):
        self.id =  str(next(self.newid)) if id == None else id
        self.file_names = list()
        self.classes = list()
        self.dependencies = {}
        self.service_calls = []
        self.interfaces = []
        self.dtos = []
        self.new_classes = [] 
        self.independent = False

    def to_json(self):
        res = {}
        res["id"] = self.id
        res["files"] = self.file_names
        res["new_classes"] = self.new_classes
        service_calls = []
        for i in self.service_calls:
            service_calls.append(i.to_json())
        res['service_calls'] = service_calls
        res["dtos"] = self.dtos
        res["interfaces"] = self.interfaces
        res["dependencies"] = self.dependencies
        res["independent"] = self.independent
        return res
    
    def get_id(self):
        return self.id

    def get_dependencies(self):
        return self.dependencies
    
    def set_service_independence(self):
        self.independent = True

    def add_interface(self, interface):
        if interface not in self.interfaces:
            self.interfaces.append(interface)
            return 0
        else: return -1 # interface already exists

    def add_dto(self, dto):
        if dto not in self.dtos:
            self.dtos.append(dto)
            return 0
        else: return -1 #dto already exists

    def add_new_class(self, new_class):
        if new_class not in self.new_classes:
            self.new_classes.append(new_class)
            return 0
        else: return -1

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
    
    def add_service_call(self, type, protocol, target, target_service, requester, owner):
        service_call = ServiceCall(type, protocol, target, target_service, requester, owner)
        self.service_calls.append(service_call)
    
    def analyze_dependencies(self, services, classes):
        dependencies = {}
        for i in self.classes:
            dep1 = i.analyze_dependencies(classes)
            dependencies[i.get_name()] = dep1 #{className : dependencies}
            
        dep = {}
        for class_name, d in dependencies.items(): # construct the dependencies object
            for c in d:
                for s in services:
                    if s.has_file(c[0]): 
                        service = s.get_id()
                        if service in dep.keys() and class_name in dep[service].keys():
                            dep[service][class_name].append(c) 
                        elif service in dep.keys() and class_name not in dep[service].keys():
                            dep[service][class_name] = [c]
                        elif service != self.id and service not in dep.keys():
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
            
    def clean_dependencies(self, extracting):
        for i in self.dependencies.keys():
            self.dependencies[i] = dict(filter(lambda x: len(x[1]) > 0, self.dependencies[i].items()))

        self.dependencies = dict(filter(lambda x: len(x[1]) > 0, self.dependencies.items()))

        if not self.dependencies and extracting:
            self.set_service_independence()

        return self
   
    def get_class_database_dependecy(self, class_name, database_dependency):
        for i in self.classes:
            if i.get_name() == class_name:
                return i.get_database_dependency(database_dependency)
            
    def check_if_class_is_interface(self, class_name):
        for i in self.classes:
            if i.get_name() == class_name:
                return i.is_interface()
            
    def check_if_class_is_entity(self, class_name):
        if '.' in class_name:
            class_name = class_name.split('.')[-1]

        for i in self.classes:
            if i.get_name() == class_name:
                return i.is_entity()
            
    def get_method_from_methodInvocation(self, file, class_name):
        if '.' in file:
            file = file.split('.')[-1]

        for i in self.classes:
            if i.get_name() == file:
                return i.get_method_from_methodInvocation(class_name)