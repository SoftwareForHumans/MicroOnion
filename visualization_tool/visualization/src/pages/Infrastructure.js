import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Infrastructure() {
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
        <h4>Infrastructure</h4>
        <p className="mt-2">
          The migration also requires an improvement to the infrastructure{" "}
          <b>to take full advantage of this new architecture</b>. Check some
          interesting refactorings/introductions you can add to your system for
          it accommodate better the microservices paradigm.
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
            style={{ width: "400px", backgroundColor: "rgba(30, 72, 143,0.9)" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Introduce Circuit Breaker
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
            style={{ width: "400px", backgroundColor: "#687f8c" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#2F4F4F" }}>
                Introduce Service Registry
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
            style={{ width: "400px", backgroundColor: "rgba(30, 72, 143,0.9)" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                {" "}
                Introduce Internal Load Balancer
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
            style={{ width: "400px", backgroundColor: "#687f8c" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#2F4F4F" }}>
                Introduce External Load Balancer
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
            style={{ width: "400px", backgroundColor: "rgba(30, 72, 143,0.9)" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Introduce Configuration Server
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
            style={{ width: "400px", backgroundColor: "#687f8c" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#2F4F4F" }}>
                Introduce Edge Server or API Gateway{" "}
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
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "rgba(30, 72, 143,0.9)" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                Configure Service Discovery
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                It is common to have the addresses where the instances are
                hosted to be dynamically allocated. As the instances running
                also changes dynamically, it is hard to control which address
                each service will have. In these circumstances, it is common to
                implement a service discovery with a service registry to keep
                track of the locations of the existing systems.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="mx-3 my-3"
            style={{ width: "400px", backgroundColor: "#687f8c" }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#2F4F4F" }}>
                Configure Health-check
              </Card.Title>
              <Card.Text style={{ color: "white" }}>
                Microservices must be aware if some service is malfunctioning to
                avoid routing requests to that microservice. This is usually
                performed by sending a health check request to the microservice
                to understand if it is operational. It should either return a
                positive response or the specific error causing it to
                malfunction.
              </Card.Text>
            </Card.Body>
          </Card>
        </Row>
      </div>
      <Row
        className="my-4 pb-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#092256",
        }}
      >
        <p className="my-2">
          {" "}
          You can find{" "}
          <b>more information and examples on the catalog (link)</b> developed
          for source of this tool.
        </p>
      </Row>
    </Container>
  );
}

export default Infrastructure;
