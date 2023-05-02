import sys
import utils
from Codebase import Codebase
from ServiceDecomposition import ServiceDecomposition
from Service import Service 
from datetime import datetime
from BreakDependencies import BreakDependencies
from RefactoringRepresentation import RefactoringRepresentation
from RefactoringSequence import RefactoringSequence
from Refactoring import Refactoring


# we expect to receive two files paths as arguments, the code representation and the services decomposition and the project name 
def main():
    if len(sys.argv) != 4:
        print("Incorrect usage! \nExpected: python main.py [codeRepresentationFilePath] [serviceDecompositionFilePath] [projectName]")
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
    
    project_name = sys.argv[3]

    refactoring_representation = RefactoringRepresentation(project_name)
    refactoring_sequence = RefactoringSequence(project_name)

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


    # analyze the dependencies of each class, identify the dependencies of each microservice
    dependencies = {}
    for s in services:
        dep = s.analyze_dependencies(services, classes)
        dependencies[str(s.get_id())] = dep
    
    #write dependencies to a file
    utils.write_json_to_results(project_name, "dependencies", dependencies)


    # refactorings = utils.read_json("./refactorings.json")
    # sequence = Refactoring("STRANGLER FIG")

    print("\n\nWe gonna take incremental steps towards the new architecture and ensure that each step is easily reversible, reducing risks. We are going to focus the initial refactoring in a high level refactoring: Strangler Fig\n\n")
    print("\n\nSTRANGLER FIG")
    initial_refactoring = Refactoring("STRANGLER FIG", 0, -1, -1)
    refactoring_sequence.set_initial_refactoring(initial_refactoring)

    #eventualmente perguntar a estrategia de começar a partir

    print("\n\nNow that the order by which we will extract each microservice is defined, we are going to extract each microservice.")

    print("\n\nAs all dependencies were already identified, we are going to focus on breaking them.\n\n")

    # começar por maior numero de dependencias, menor, alguma métrica - por default vamos começar com o menor
    break_dependencies = BreakDependencies(services, dependencies, initial_refactoring, refactoring_representation)
    break_dependencies.break_dependencies()

    refactoring_sequence.write_refactoring_sequence()
    







    # print("\n\n Do you want to save the output?(y/n)")
    # i = input()
    # if(i.lower() == "y"):
        # now = datetime.now()
    #     utils.write_json_to_results("result_" + now.strftime("%d%m%y_%H%M%S"), r)
    #     print("The file was writen successfully to the results folder.")
    
main()
