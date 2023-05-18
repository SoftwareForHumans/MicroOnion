import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Deployment() {
  const titles = [
    "Enable continuous integration",
    "Containerize services",
    "Orchestrate service",
    "Deploy into a cluster and orchestrate containers",
    "Centralize logging",
    "Centralize Configuration",
  ];
  const texts = [
    "The number of services expands due to the migration to microservices, yet we want the system to be \"production-ready.\" We want to build and test the microservices automatically, as well as verify their availability. Because we execute minor and frequent changes, continuous integration shortens the time it takes to validate and release software.",
    "One of the goals of breaking down a system into microservices is to make them totally independent of one another. This means that each microservice can be designed with a different technology and, as a result, each microservice will require a distinct environment for deployment. Containerization is a type of virtualization in which a service is deployed into a single container image and runs isolated from the other services with its own desired environment.",
    "The more microservices that are created, the more difficult it is to manage all of them and their dependencies, since they all have different characteristics. When availability, provisioning, scaling, and other configurations are added, it becomes overwhelming to accomplish this manually. Fortunately, orchestration tools/frameworks allow you to describe all of these behavioral preferences in a configuration file that establishes a distributed cluster with the appropriate nodes, builds the system, and operates it automatically.",
    "Deploy all service instances into a cluster and orchestrate them with the least effort possible.",
    "Logs aid in the diagnosis, troubleshooting, and tracking of issues. They usually get stored in the source directory in a log file. If each microservice had its own log file, analyzing and debugging the overall system would be more difficult. This is simplified by having a centralized logging infrastructure where we can view the logs created by each microservice.",
    "Each microservice may have its own set of configuration files. Because there are system-wide configurations, some of these configurations can be duplicated for all microservices. When one of these global configurations changes, all microservices must be updated, which is inefficient. The extraction of these configurations into a configuration server centralizes the configurations, making modification easier.",
  ];
  return (
    <Container className="my-4">
      <Row className="px-5 center-all blue-text">
        <h4>Deployment & Orchestration</h4>
        <p className="mt-2">
          Another major difference between monoliths and microservices is their{" "}
          <b>deployment</b>. Each service usually has multiple running instances
          and each of these instances has to be deployed, configured and
          monitored. In addition, having multiple instances running
          simultaneously, <b>orchestration becomes more demanding</b>.<br></br>
          Explore the refactorings/introductions to answer the demands of
          deployment and orchestration.
        </p>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          justifyContent: "left",
        }}
      >
        {titles.map((title, index) => (
          <Card
            className="m-3"
            style={{
              width: "400px",
              height: "350px",
              backgroundColor:
                index % 2 === 0 ? "rgba(60,118,225,0.65)" : "rgba(9,34,86,0.9)",
              borderColor:
                index % 2 === 0 ? "rgba(60,118,225,0.65)" : "rgba(9,34,86,0.9)",
            }}
          >
            <Card.Body>
              <Card.Title
                className="mb-2"
                style={{ color: index % 2 === 0 ? "#092256" : "#c0c0c0" }}
              >
                {title}
              </Card.Title>
              <Card.Text style={{ color: index % 2 === 0 ? "black" : "white" }}>
                {texts[index]}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Row className="my-4 pb-5 center-all blue-text">
        <p>
          You can find{" "}
          <b>
            more information and examples on the{" "}
            <a
              style={{ color: "#092256" }}
              href="https://drive.google.com/file/d/1OHzI64pzNWmRZ2t61A30LHS_ItqX4all/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              catalog
            </a>{" "}
          </b>{" "}
          developed for source of this tool.
        </p>
      </Row>
    </Container>
  );
}

export default Deployment;
