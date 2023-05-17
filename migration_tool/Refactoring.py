import itertools
class Refactoring:
    newid = itertools.count()

    def __init__(self, name, level, microservice_id, dependent_microservice_id, notes={}):
        self.id = next(self.newid)
        self.name = name
        self.level = level
        self.microservice = microservice_id
        self.dependent_microservice = dependent_microservice_id
        self.refactorings = []
        self.notes = notes

    def to_json(self):
        res =  {}
        res["id"] = self.id
        res["name"] = self.name
        res["level"] = self.level
        res["microservice"] = self.microservice
        res["dependent_microservice"] = self.dependent_microservice
        res["notes"] = self.notes
        refactorings = []
        for r in self.refactorings:
            refactorings.append(r.to_json())
        if len(refactorings) > 0:
            res['refactorings'] = refactorings
            
        return res

    def add_refactoring(self, refactoring):
        self.refactorings.append(refactoring)
        return refactoring

    def get_level(self):
        return self.level
    
    def get_refactorings(self):
        return self.refactorings
    
    def set_notes(self, notes):
        self.notes = notes