from utils import check_if_primitive
import re
class Method:
    def __init__(self, name, return_type=None, identifier = None, parameters=[], exceptions=[], body=[], annotations=[], route="", modifier="public"):
        self.name = name
        self.return_type = return_type
        self.identifier = identifier
        self.parameters = parameters
        self.exceptions = exceptions
        self.body = body
        self.annotations = annotations
        self.route = route
        self.modifier = modifier
    
    def extract_info(self, method_info):
        self.return_type = method_info["returnDataType"][0] if "returnDataType" in method_info.keys() else self.return_type
        self.parameters = method_info["parametersDataType"] if "parametersDataType" in method_info.keys() else self.parameters
        self.exceptions = method_info["exception"] if "exception" in method_info.keys() else self.exceptions
        self.body = method_info["body"].split("\n") if "body" in method_info.keys() else self.body
        self.annotations = method_info["annotations"] if "annotations" in method_info.keys() else self.annotations
        self.route = method_info["route"] if "route" in method_info.keys() else self.route
        self.modifier = method_info["modifier"] if "modifier" in method_info.keys() else self.modifier

    def check_dependencies(self):
        dep = set()

        if self.return_type.isalpha():
            if not check_if_primitive(self.return_type):
                dep.add(self.return_type)
        else:
            w = re.search('\w*<(.+?)>', self.return_type)
            if w:
                    dep.add(w.group(1))

        for i in self.parameters:
            if i["type"].isalpha():
                if not check_if_primitive(i["type"]):
                    dep.add(i["type"])
            else:
                w = re.search('\w*<(.+?)>', i["type"])
                if w:
                    dep.add(w.group(1))

        return list(dep)
