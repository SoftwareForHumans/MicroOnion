class ServiceRepresentation:
    def __init__(self, id):
        self.id = id
        self.service_calls = []
        self.new_variables = []
        self.entities= []
        self.dtos = []
        self.own_database = False
        self.files = []
        self.interfaces = []
    
    def to_json(self):
        res = {}
        res["id"] = self.id
        res["service_calls"] = self.service_calls
        res["entities"] = self.entities
        res["new_variables"] = self.new_variables
        res["dtos"] = self.dtos
        res["database_tables"] = self.database_tables
        res["files"] = self.files
        res["interfaces"] = self.interfaces
        return res
    
    def set_own_database(self, own_database):
        self.own_database = own_database
    
    def add_dto(self, dto):
        self.dtos.append(dto)
    
    def add_interface(self, interface):
        self.interface.append(interface)