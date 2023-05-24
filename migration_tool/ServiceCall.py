class ServiceCall:
    def __init__(self, type, protocol, target, target_service, requester, owner):
        self.type = type
        self.protocol = protocol
        self.target = target
        self.target_service = target_service
        self.requester = requester
        self.owner = owner

    def to_json(self):
        res = {}
        res['type'] = self.type
        res['protocol'] = self.protocol
        res['target'] = self.target
        res['target_service'] = self.target_service
        res["requester"] = self.requester
        res["owner"] = self.owner
        return res