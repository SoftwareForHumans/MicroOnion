import utils 
class RefactoringRepresentation:
    def __init__(self, name):
        self.project_name = name    
        self.refactorings = []
        self.snapshot_number = 0

    
    def create_new_snapshot(self):
        res = {}
        res['project_name'] = self.project_name
        res['snapshot_number'] = self.snapshot_number
        #estado do projeto
