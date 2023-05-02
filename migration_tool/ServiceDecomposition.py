from Service import Service

class ServiceDecomposition:
    def __init__(self):
        self.clusters = dict()
        self.services = list()

    def extract_service_decomposition(self, service_decomposition):
        self.clusters = service_decomposition
        services = []

        for _, c in self.clusters.items():
            s = Service()
            s.add_files(c)
            services.append(s)

        self.services = services
    
    def get_services(self):
        return self.services
    
    def get_clusters(self):
        return self.clusters
