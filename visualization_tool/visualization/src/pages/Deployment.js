import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Deployment() {
  return (
    <Container className="mb-5">
      <Row
        className="my-4 px-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#092256",
        }}
      >
        <h4>Deployment & Orchestration</h4>
        <p className="mt-2">Another major difference between monoliths and microservices is their <b>deployment</b>. As seen in the previous chapter, besides each microservice having to be deployed, each service usually has multiple running instances. Each of these instances has to be deployed, configured and monitored. In addition, having multiple instances running simultaneously, <b>orchestration becomes more demanding</b>. 
            Explore the refactorings/introductions to answer the demands of deployment and orchestration.
        </p>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#3C76E1" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#092256" }}>
                Enable continuous integration
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Introducing a circuit breaker will create a wrapper around the
                remote invocations and a barrier that will shut down further
                attempts to invoke a remote service according to a configured
                threshold so that the system can recover from faults and not
                perpetuate them across the entire system.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#092256" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Containerize services
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Each service can have one or more instances in production that
                can be changed dynamically. Introducing Service Registry allows
                services to locate each other dynamically.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#3C76E1" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#092256" }}>
                {" "}
                Orchestrate service
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Imagine you have already set up a service registry. This service
                registry has information about the multiple instances of each
                running microservice. With this information,it is possible to
                balance the load on a service between its instances. The focus
                of its being internal is to balance the load according to the
                client’s conditions without needing an external load balancer.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#092256" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Deploy into a cluster and orchestrate containers
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Imagine you have already set up a service registry. This service
                registry has information about the multiple instances of each
                running microservice. With this information,it is possible to
                balance the load on a service between its instances. The focus
                is to balance the load by performing the least changes possible
                in the service’s code and creating a centralised load balancing
                approach for all the services.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#3C76E1" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#092256" }}>
                Centralize logging
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Each microservice can have multiple instances running in
                production. Although, with service registry, the list of
                availabe instances is accessible, there may be the need to
                change some configurations while they are running without
                redeploying them.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#092256" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Centralize Configuration
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                New services can be introduced or old ones can be rearchitected
                easily. The user, however, does not need to be aware of this and
                these action should be monitored, enabling dynamic rerouting of
                external requests to internal services. The API Gateway allows
                services to use different communication technologies and become
                a common API with calls to multiple services.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
    </Container>
  );
}

export default Deployment;
