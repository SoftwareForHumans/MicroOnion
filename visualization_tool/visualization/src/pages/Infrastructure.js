import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Infrastructure() {
  const titles = [
    "Introduce Circuit Breaker",
    "Introduce Service Registry",
    "Introduce Internal Load Balancer",
    "Introduce External Load Balancer",
    "Introduce Configuration Server",
    "Introduce Edge Server or API Gateway",
    "Configure Service Discovery",
    "Configure Health-check",
  ];
  const texts = [
    "Adding a circuit breaker will provide a wrapper over remote invocations and a barrier that will shut off additional attempts to invoke a remote service based on a set threshold, allowing the system to recover from problems rather than propagate them throughout the system.",
    "Each service can have one or more instances in production that can be modified dynamically. The introduction of Service Registry enables services to dynamically locate one another.",
    "Assume you've already established a service registry. This service registry contains information about each operating microservice's many instances. It is feasible to balance the load on a service amongst its instances using this information. Its core focus is to balance the load based on the client's requirements without the need for an external load balancer.",
    "Imagine you have already set up a service registry. This service registry has information about the multiple instances of each running microservice. With this information, it is possible to balance the load on a service between its instances. The goal is to balance the load with as few changes to the service code as possible and to create a centralized load balancing approach for all services.",
    "In production, each microservice might have numerous instances. Although the list of available instances is accessible through the service registry, it may be necessary to update some configurations while they are operating without redeploying them. By using a configuration server, we can propagate the changes in the configuration to all running instances.",
    "New services can be simply introduced, and existing ones can be rearchitected. The user, on the other hand, does not need to be aware of this, and these actions should be tracked, allowing for dynamic rerouting of external requests to internal services. The API Gateway enables services to leverage several communication methods and form a single API with calls to many services.",
    "The addresses where the instances are hosted are frequently dynamically allocated. Because the number of instances running changes dynamically, it is difficult to predict which address each service will have. It is usual in these scenarios to set up a service discovery with a service registry to keep track of the locations of existing systems.",
    "Microservices must be notified when a service fails in order to avoid routing requests to that microservice. This is often accomplished by sending a health check request to the microservice to determine whether or not it is operational. It should either respond positively or return the specific error that is causing it to malfunction.",
  ];
  return (
    <Container className="my-4">
      <Row className="px-5 center-all blue-text">
        <h4>Infrastructure</h4>
        <p className="mt-2 ">
          The migration also requires an improvement to the infrastructure{" "}
          <b>to take full advantage of this new architecture</b>. Check some
          interesting refactorings/introductions you can add to your system for
          it accommodate better the microservices paradigm.
        </p>
      </Row>
      <div
        className="center-all flex-row"
      >
        <Row>
          {titles.map((title, index) => (
            <Card
              className="m-3 pb-2"
              style={{
                width: "400px",
                backgroundColor:
                  index % 2 === 0 ? "rgba(30, 72, 143,0.9)" : "#687f8c",
                borderColor:
                  index % 2 === 0 ? "rgba(30, 72, 143,0.9)" : "#687f8c",
              }}
            >
              <Card.Body>
                <Card.Title
                  className="mb-2"
                  style={{ color: index % 2 === 0 ? "#c0c0c0" : "#2F4F4F" }}
                >
                  {title}
                </Card.Title>
                <Card.Text className="text-white">{texts[index]}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
      <Row className="my-4 pb-5 center-all blue-text">
        <p className="my-2">
          You can find{" "}
          <b>
            more information and examples on the{" "}
            <a
              style={{ color: "#092256" }}
              href="https://drive.google.com/file/d/1OHzI64pzNWmRZ2t61A30LHS_ItqX4all/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              catalog{" "}
            </a>
          </b>{" "}
          developed for source of this tool.
        </p>
      </Row>
    </Container>
  );
}

export default Infrastructure;
