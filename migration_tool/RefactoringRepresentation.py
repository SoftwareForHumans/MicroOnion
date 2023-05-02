import utils 
class RefactoringRepresentation:
    def __init__(self, name):
        self.project_name = name    
        self.snapshot_number = 0
        self.services = []

    
    def create_new_snapshot(self):
        res = {}
        res['project_name'] = self.project_name
        res['snapshot_number'] = self.snapshot_number
        
        services = []
        for s in self.services:
            services.append(s.to_json())
        res['services'] = services

        utils.write_json_to_results(self.project_name, "snapshot" + self.snapshot_number , res)

        self.snapshot_number += 1

    def add_service(self, service):
        self.services.append(service)