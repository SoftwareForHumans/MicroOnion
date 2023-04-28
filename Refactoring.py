class Refactoring:
    def __init__(self, name, level):
        self.name = name
        self.level = level
        self.refactorings = []

    def to_json(self):
        res =  {}
        res["name"] = self.name
        res["level"] = self.level
        refactorings = []
        for r in self.refactorings:
            refactorings.append(r.to_json())
        res['refactorings'] = refactorings
        return res

    def add_refactoring(self, refactoring):
        self.refactorings.append(refactoring)
        return refactoring

    def get_level(self):
        return self.level
    
    def get_refactorings(self):
        return self.refactorings