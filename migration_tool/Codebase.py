import json
from Class import Class

class Codebase:
    def __init__(self):
        self.classes = dict()
    
    def extract_codebase(self, code_representation):
        code = json.loads(code_representation)

       
        for _, c in code.items():
            new_class = self.extract_class_information(c)
            self.classes[new_class.get_file_name()] = new_class
        return
    
    def extract_class_information(self, class_info):
        new_class = Class(class_info['full_name'] if "full_name" in class_info.keys() else None, class_info['short_name'] if "short_name" in class_info.keys() else None, class_info['package'] if "package" in class_info.keys() else None, class_info['isInterface'] if "isInterface" in class_info.keys() else False)
        return new_class.extract_info(class_info)
    
    def get_classes(self):
        return self.classes