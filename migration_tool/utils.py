from pathlib import Path
import json
import os
import re

primitives = ["int", "float", "char", "double", "boolean", "byte", "short", "long", "integer", "void", "string"]

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

def write_json_to_results(project_name, filename, content):
    folder_path = "./results/" + project_name
    exists = os.path.exists(folder_path)
    
    if not exists:
        os.makedirs(folder_path)
    path = "./results/" + project_name + "/" + filename + ".json"

    file = open(path, "w")
    file.write(json.dumps(content))
    file.close()
    
    return

def get_is_part_of_key(classes, key):
    for i in classes.keys():
        parts = i.split('.')
        if key == parts[-1]: return i
    return None

def check_if_primitive(variable):
    return variable.lower() in primitives


def getManyToMany(variable_annotations):
    # ['@ManyToMany(fetch = FetchType.EAGER)', '@JoinTable(name = "USER_ROLES", joinColumns = @JoinColumn(name = "USER_ID"), inverseJoinColumns = @JoinColumn(name = "ROLE_ID"))']
    s = [x for x in variable_annotations if re.match("^@JoinTable", x)][0]
    s = s.replace(" ", "")
    parts = s.split(",")
    table = re.sub('@JoinTable\(name=\\\"', '', parts[0])
    table = re.sub('"', '', table)
    column = re.sub('joinColumns=@JoinColumn\(name=\\\"','', parts[1])
    column = re.sub('"\)', '', column)
    inverse_column = re.sub('inverseJoinColumns=@JoinColumn\(name=\\\"', '', parts[2])
    inverse_column = re.sub('"\)\)', '', inverse_column)

    return [table, column, inverse_column]

def getOneToOne(variable_annotations):
    annotation = [x for x in variable_annotations if re.match("^@JoinColumn", x)][0]
    column_name = annotation.replace(" ", "")
    column_name = re.sub('@JoinColumn\(name=\\\"', '', column_name)
    column_name = re.sub('referencedColumnName=\\\"', '',column_name)
    column_name = re.sub('\)', '',column_name)
    column_name = re.sub('\"', '',column_name)

    return column_name


def getManyToOne(variable_annotations):
    # ['@ManyToOne', '@JoinColumn(name = "DISH_ID")']
    annotation = [x for x in variable_annotations if re.match("^@JoinColumn", x)][0] #there shouldnt be more than one 
    column_name = annotation.replace(" ", "")
    column_name = re.sub('@JoinColumn\(name=\\\"', '', column_name)
    column_name = re.sub('\"\)', '',column_name)

    return column_name
