class Refactoring:
    def __init__(self, name):
        self.name = name    
        self.children = []

    def add_child(self, child):
        self.children.append(child)
        return child

    def get_children(self):
        return self.children

    def get_name(self):
        return self.name