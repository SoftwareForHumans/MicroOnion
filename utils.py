from pathlib import Path
import json

primitives = ["int", "float", "char", "double", "boolean", "byte", "short", "long"]

def check_if_file_exists(path):
    p = Path(path)
    return p.is_file()

def read(path):
    if check_if_file_exists(path):
        file = open(path, "r")
        return file.read()
    return -1

def read_json(path):
    if check_if_file_exists(path):
        file = open(path, "r")
        return json.load(file)
    return -1

def write_json_to_results(filename, content):
    path = "./results/" + filename + ".json"

    file = open(path, "w")
    file.write(json.dumps(content))
    file.close()
    
    return

def get_is_part_of_key(classes, key):
    for i in classes.keys():
        if key in i: return i
    return None

def check_if_primitive(variable):
    return variable.lower() in primitives