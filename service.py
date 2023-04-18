import itertools
class Service:

    newid = itertools.count()

    def __init__(self):
        self.id = next(self.newid)
        self.file_names = list()
        self.classes = list()
        self.dependencies = list()

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
        print("\nAnalyzing dependencies of cluster", self.id)
        dependencies = []
        for i in self.classes:
            dep = i.analyze_dependencies(classes)
            dependencies.extend([j for j in dep if j not in self.file_names and j not in dependencies ])

        dep = {}
        for c in dependencies:
            for s in services:
                if s.has_file(c): 
                    if s.get_id() in dep:
                        dep[s.get_id()].append(c) 
                    else:
                        dep[s.get_id()] =[c]
                        
        return len(dependencies), dep
