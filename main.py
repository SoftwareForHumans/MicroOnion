import sys
import utils
from Codebase import Codebase
from ServiceDecomposition import ServiceDecomposition
from Service import Service 
from datetime import datetime
from BreakDependencies import BreakDependencies


# we expect to receive two files paths as arguments, the code representation and the services decomposition
def main():
    if len(sys.argv) != 3:
        print("Incorrect usage! \nExpected: python main.py [codeRepresentationFilePath] [serviceDecompositionFilePath]")
        return

    # extract classes information from code base
    code = utils.read(sys.argv[1])
    if code == -1: 
        print("Incorrect usage! Code representation file does not exist!")
        return -1
    codebase = Codebase()
    codebase.extract_codebase(code)

    # extract decomposition information from suggested clusters
    decomposition = utils.read_json(sys.argv[2])
    if decomposition == -1: 
        print("Incorrect usage! Service Decomposition file does not exist!")
        return -1
    service_decomposition = ServiceDecomposition()
    service_decomposition.extract_service_decomposition(decomposition)

    # create the services with information about all the classes of the service
    services = service_decomposition.get_services()
    classes = codebase.get_classes()
    for service in services:
        service_classes = []
        for file in service.get_files():
            if file in classes.keys():
                service_classes.append(classes[file])

        service.add_classes(service_classes)
   

    # provide some visualization of the clusters after extracting the code and clusters information
    for i in services:
        print(i.get_id())
        for j in i.get_files():
            print(j)
        print("\n\n")


    # analyze the dependencies of each class, identify the dependencies of each microservice and provide some visualization
    dependencies = {}
    for s in services:
        num_dep, dep = s.analyze_dependencies(services, classes)
        dependencies[str(s.get_id())] = [num_dep, dep]
    
    #write dependencies to a file
    utils.write_json_to_results("dependencies", dependencies)

    






    
    # começar por maior numero de dependencias, menor, alguma métrica - por default vamos começar com  o menor
    dependencies = sorted(dependencies.items(), key = lambda x: x[1][0])
    break_dependencies = BreakDependencies(services, dependencies)
    break_dependencies.break_database_dependencies()










    # print("\n\n Do you want to save the output?(y/n)")
    # i = input()
    # if(i.lower() == "y"):
        # now = datetime.now()
    #     utils.write_json_to_results("result_" + now.strftime("%d%m%y_%H%M%S"), r)
    #     print("The file was writen successfully to the results folder.")
    
main()