import utils
class RefactoringSequence:
    def __init__(self, name):
        self.project_name = name
        self.initial_refactoring = None
        self.snapshot_number = 0
    
    def write_refactoring_sequence(self):
        res = {}
        res['project_name'] = self.project_name
        refactorings = []
        for r in self.initial_refactoring.get_refactorings():
            refactorings.append(r.to_json())
        res['refactorings'] = refactorings
        utils.write_json_to_results(self.project_name, "refactorings_sequence_snapshot" + str(self.snapshot_number) , res)
    
    def set_initial_refactoring(self, initial_refactoring):
        self.initial_refactoring = initial_refactoring
    
    def add_refactorings(self, refactorings):
        self.refactorings = refactorings
    
    def get_refactorings(self):
        return self.refactorings

    def new_snapshot(self):
        self.snapshot_number += 1