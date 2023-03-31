
from datetime import datetime
from pathlib import Path
import json

def check_if_file_exists(path):
    p = Path(path)
    return p.is_file()

def read(path):
    if check_if_file_exists(path):
        file = open(path, "r")
        return file.read()
    return -1

def write_result(result):
    now = datetime.now()
    path = "./results/" + "result_" + now.strftime("%d%m%y_%H%M%S")

    file = open(path, "w")
    file.write(json.dumps(result))
    file.close()
    
    return