from utils import get_is_part_of_key, check_if_primitive
from Method import Method
import re 

class Class:
    def __init__(self, file_name, class_name, package, constructor=[], annotations=[], dependencies=[], methods=[], variables=[], implements=[], method_invocations=[], extends=[], imports=[], is_interface = False):
        self.file_name = file_name
        self.class_name = class_name
        self.package = package
        self.constructor = constructor
        self.annotations = annotations
        self.is_interface = is_interface
        self.dependencies = dependencies
        self.variables = variables
        self.methods = methods
        self.implements = implements
        self.extends = extends
        self.imports = imports
        self.methods_invocations = method_invocations
        self.database_dependencies = {"variables": [], "methods": []}

    def extract_info(self, class_info):
        self.constructor = class_info['constructor'] if "constructor" in class_info.keys() else self.constructor
        self.annotations = class_info['annotations'] if "annotations" in class_info.keys() else self.annotations
        self.variables = class_info['instance_variables'] if "instance_variables" in class_info.keys() else self.variables
        # self.dependencies = class_info['dependencies'] if "dependencies" in class_info.keys() else self.dependencies -- usually on the java parser output but empty, as it does not follow the format we defined, we will keep it blank
        self.methods_invocations = class_info['methodInvocations'] if "methodInvocations" in class_info.keys() else self.methods_invocations
        self.imports = class_info['imports'] if "imports" in class_info.keys() else self.imports
        
        methods = class_info['methods'].values() if "methods" in class_info.keys() else self.methods
        methods_instances = []
        for i in methods:
            m = Method(i["name"])
            m.extract_info(i)
            methods_instances.append(m)
        self.methods = methods_instances
        
        self.implements = class_info['implements'] if "implements" in class_info.keys() else self.implements

        self.extends = class_info['extends'] if "extends" in class_info.keys() else self.extends

        self.methods_invocations = class_info['methodsInvocations'] if "methodsInvocations" in class_info.keys() else self.method_invocations

        return self
    
    
    def get_file_name(self):
        return self.file_name
    
    def get_name(self):
        return self.class_name
    
    def is_interface(self):
        return self.interface

    def is_entity(self):
        return any(re.match("^@Entity",line) for line in self.annotations)
    
    def get_dependencies(self):
        return self.dependencies
    
    def get_database_dependencies(self):
        return self.database_dependencies

    def get_database_dependency(self, dependent_file):
        for i in self.database_dependencies["variables"]:
            file = dependent_file.split('.')[-1]
            if file in i:
                return i
    
    def analyze_dependencies(self, classes):
        self.dependencies = []

        for i in self.extends:
            key = get_is_part_of_key(classes, i.split("<")[0])
            if key != None:
                self.add_dependency("extends", key)

        for i in self.implements:
            key = get_is_part_of_key(classes, i.split("<")[0])
            if key != None:
                self.add_dependency("implements", key)

        for i in self.methods_invocations:
            if i['targetClassName'] in classes.keys():
                self.add_dependency("methodInvocation", i['targetClassName'])

        # verify variables        
        for i in self.variables:
            type = i["type"]
            type_class = get_is_part_of_key(classes, type)
            if type_class != None and not check_if_primitive(type_class):
                self.add_dependency("variableType", type_class)

        for i in self.methods:
            dep = i.check_dependencies()
            for j in dep:
                class_name = get_is_part_of_key(classes, j)
                if class_name != None:
                    self.add_dependency("methodVariable", class_name)
        
        # verify other things that may have not been catched in the previous code
        for i in self.imports:
            class_name = get_is_part_of_key(classes, i)
            if class_name != None:
                self.add_dependency("imports", class_name)
        
        self.analyze_database_dependencies(classes)

        return self.dependencies

    def analyze_database_dependencies(self, classes):
        
        if any(re.match("^@Entity",line) for line in self.annotations):
            for variable in self.variables:
                variable_annotations = variable["annotations"]
                if any(re.match("^@OneToMany",line) for line in variable_annotations):
                    param = self.get_primary_key(classes)
                    self.database_dependencies["variables"].append(["OneToMany", variable["identifier"][1], param[1]])

                elif any(re.match("^@ManyToMany",line) for line in variable_annotations):
                    if any(re.match("^@JoinTable",line) for line in variable_annotations):
                        s = [x for x in variable_annotations if re.match("^@JoinTable", x)][0]
                        s = s.replace(" ", "")
                        parts = s.split(",")
                        table = re.sub('@JoinTable\(name=\\\"', '', parts[0])
                        table = re.sub('"', '', table)
                        column = re.sub('joinColumns=@JoinColumn\(name=\\\"','', parts[1])
                        column = re.sub('"\)', '', column)
                        inverse_column = re.sub('inverseJoinColumns=@JoinColumn\(name=\\\"', '', parts[2])
                        inverse_column = re.sub('"\)\)', '', inverse_column)
                        
                        self.database_dependencies["variables"].append(["ManyToMany",  variable["identifier"][1], table, column, inverse_column])
                    else: 
                        self.database_dependencies["variables"].append(["ManyToMany", variable["identifier"][1]])

                elif any(re.match("^@OneToOne",line) for line in variable_annotations):
                    if any(re.match("^@JoinColumn",line) for line in variable_annotations):
                        annotation = [x for x in variable_annotations if re.match("^@JoinColumn", x)][0]
                        column_name = annotation.replace(" ", "")
                        column_name = re.sub('@JoinColumn\(name=\\\"', '', column_name)
                        column_name = re.sub('referencedColumnName=\\\"', '',column_name)
                        column_name = re.sub('\)', '',column_name)
                        column_name = re.sub('\"', '',column_name)
                        self.database_dependencies["variables"].append(["OneToOne", variable["identifier"], column_name.split(",")[0], column_name.split(",")[1]])
                    else:
                        column_name = re.sub('@JoinColumn\(name = \\\"', '',variable['annotations'][1])
                        self.database_dependencies["variables"].append(["OneToOne", variable["identifier"]])

                elif any(re.match("^@ManyToOne",line) for line in variable_annotations):
                    if any(re.match("^@JoinColumn",line) for line in variable_annotations):
                        annotation = [x for x in variable_annotations if re.match("^@JoinColumn", x)][0]
                        column_name = annotation.replace(" ", "")
                        column_name = re.sub('@JoinColumn\(name=\\\"', '', column_name)
                        column_name = re.sub('\"\)', '',column_name)

                        self.database_dependencies["variables"].append(["ManyToOne",variable["type"], column_name])
                    else: 
                        self.database_dependencies["variables"].append(["ManyToOne",variable["type"]])

        for i in self.database_dependencies["variables"]:
            class_name = get_is_part_of_key(classes, i[1])
            if class_name != None:
                self.add_dependency("databaseDependency", class_name)
        

    def get_primary_key(self, classes):
        for variable in self.variables:
            if "@Id" in variable["annotations"]:
                return variable["type"], variable["variable"]
            
        if any(re.match("^@PrimaryKeyJoinColumn", line) for line in self.annotations):
            annotation = [x for x in self.annotations if re.match("^@PrimaryKeyJoinColumn", x)][0]
            annotation = annotation.replace(" ", )
            if re.match("^@PrimaryKeyJoinColumn\(name=\\\"", annotation):
                name = re.sub("^@PrimaryKeyJoinColumn\(name=\\\"", "", annotation)
                name = re.sub('\"\)', '', name)
                if "." in  self.extends[0]:
                    for i in classes:
                        if i.get_filename() == self.extends[0]:
                            return i.primaryKeyVariableType(classes)
                else:
                    for i in classes:
                        if i.get_filename() == self.extends[1]:
                            return i.primaryKeyVariableType(classes)

    def add_dependency(self, type, dependency):
        for i in self.dependencies:
            if i[0] == dependency: # already is on the dependencies 
                if type not in i: # that dependency does not have this type
                    i.append(type)
                return # either the type was already there or we added it
        
        if dependency != self.file_name:
            self.dependencies.append([dependency, type])

    def get_method_from_methodInvocation(self, className):
        for i in self.methods_invocations:
            if i["targetClassName"] == className:
                return i["methodName"]

    def to_json(self):
        res = dict()
        res['file_name'] = self.file_name
        res['class_name'] = self.class_name
        res['constructor'] = self.constructor
        res['package'] = self.package
        res['annotations'] = self.annotations
        res['dependencies'] = self.dependencies 
        res['variables'] = self.variables
        res['methods'] = self.methods
        res['implements'] = self.implements
        res['extends'] = self.extends
        res['imports'] = self.imports
        res['methodsInvocations'] = self.methodsInvocations
        res['isInterface'] = self.isInterface
        res['database_dependencies'] = self.database_dependencies

        methods = []
        for i in self.methods:
            methods.append(i.to_json())
        res['methods'] = methods

        return res