import sys
import utils
from code_representation import Codebase
from service_decomposition import ServiceDecomposition


# we expect to receive two files paths as arguments, the code representation and the services decomposition
def main():

    if len(sys.argv) != 3:
        print("Incorrect usage! \nExpected: python main.py [codeRepresentationFilePath] [serviceDecompositionFilePath]")
        return

    code = utils.read(sys.argv[1])
    if code == -1: 
        print("Incorrect usage! Code representation file does not exist!")
        return -1
    c = Codebase()
    c.extract_codebase(code)

    decomposition = utils.read(sys.argv[2])
    if decomposition == -1: 
        print("Incorrect usage! Service Decomposition file does not exist!")
        return -1
    service_decomposition = ServiceDecomposition()
    service_decomposition.extract_service_decomposition(decomposition)

    # print("\n\n Do you want to save the output?(y/n)")
    # i = input()
    # if(i.lower() == "y"):
    #     utils.write_result(r)
    #     print("The file was writen successfully to the results folder.")
    
main()