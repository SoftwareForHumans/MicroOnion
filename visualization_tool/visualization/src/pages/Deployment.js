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
    "With the migration to microservices, the number of services increased, but we want to have the system “production-ready”. We want to build and test the microservices and ensure their availability automatically. Continuous integration reduces the time of validating and releasing software, as we implement small and frequent changes.",
    "One of the goals of dividing a system into microservices is to allow them to be completely independent. This means each microservice can be built using different technologies and, therefore, each microservice will need a different environment for its deployment. Containerization is a type of virtualization where a service can be deployed into a single container image and run isolated from the other services with its own desired environment.",
    "The more microservices are created, the harder it is to manage all the microservices and the dependencies between them, as they all have different specificities. At some point, it becomes unmanageable to do this manually as to configuration are added availability, provisioning, scaling, etc. Thankfully, orchestration tools/frameworks allow you to specify all these behavioural wishes in a configuration file that starts a distributed cluster with the nodes specified, creates the system and runs it automatically.",
    "Deploy all service’s instances into a cluster and orchestrate them with the least effort possible.",
    "Logs contribute to the easier diagnosis, debugging and issue tracking. They are usually stored in a log file in the source directory. If each microservice had its log file, the analysis of the execution of the entire system and debugging would be more challenging. Having a centralized logging infrastructure where we can view the logs produced by each microservices facilitates this.",
    "Each microservice can have its configuration files. Some of these configurations can sometimes be repeated for all microservices because there are configurations that are global to the system. When one of these global configurations changes, these changes must be propagated to all microservices, which is not ideal. Extracting these configurations into a configuration server centralizes the configurations, facilitating their modification.",
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
