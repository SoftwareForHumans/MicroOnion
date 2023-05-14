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
    "Introducing a circuit breaker will create a wrapper around the remote invocations and a barrier that will shut down further attempts to invoke a remote service according to a configured threshold so that the system can recover from faults and not perpetuate them across the entire system.",
    "Each service can have one or more instances in production that can be changed dynamically. Introducing Service Registry allows services to locate each other dynamically.",
    "Imagine you have already set up a service registry. This service registry has information about the multiple instances of each running microservice. With this information,it is possible to balance the load on a service between its instances. The focus of its being internal is to balance the load according to the client’s conditions without needing an external load balancer.",
    "Imagine you have already set up a service registry. This service registry has information about the multiple instances of each running microservice. With this information,it is possible to balance the load on a service between its instances. The focus is to balance the load by performing the least changes possible in the service’s code and creating a centralised load balancing approach for all the services.",
    "Each microservice can have multiple instances running in production. Although, with service registry, the list of availabe instances is accessible, there may be the need to change some configurations while they are running without redeploying them.",
    "New services can be introduced or old ones can be rearchitected easily. The user, however, does not need to be aware of this and these action should be monitored, enabling dynamic rerouting of external requests to internal services. The API Gateway allows services to use different communication technologies and become a common API with calls to multiple services.",
    "It is common to have the addresses where the instances are hosted to be dynamically allocated. As the instances running also changes dynamically, it is hard to control which address each service will have. In these circumstances, it is common to implement a service discovery with a service registry to keep track of the locations of the existing systems.",
    "Microservices must be aware if some service is malfunctioning to avoid routing requests to that microservice. This is usually performed by sending a health check request to the microservice to understand if it is operational. It should either return a positive response or the specific error causing it to malfunction.",
  ];
  return (
    <Container className="my-4">
      <Row className="px-5 center-all " style={{ color: "#092256" }}>
        <h4>Infrastructure</h4>
        <p className="mt-2 blue-text">
          The migration also requires an improvement to the infrastructure{" "}
          <b>to take full advantage of this new architecture</b>. Check some
          interesting refactorings/introductions you can add to your system for
          it accommodate better the microservices paradigm.
        </p>
      </Row>
      <div
        className="center-all"
        style={{
          flexDirection: "row",
        }}
      >
        <Row>
          {titles.map((title, index) => (
            <Card
              className="mx-3 my-3"
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
                <Card.Text style={{ color: "white" }}>{texts[index]}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
      <Row className="my-4 pb-5 center-all " style={{ color: "#092256" }}>
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
