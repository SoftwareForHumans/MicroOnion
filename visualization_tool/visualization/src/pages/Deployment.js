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
        <p className="mt-2">
          Another major difference between monoliths and microservices is their{" "}
          <b>deployment</b>. As seen in the previous chapter, besides each
          microservice having to be deployed, each service usually has multiple
          running instances. Each of these instances has to be deployed,
          configured and monitored. In addition, having multiple instances
          running simultaneously, <b>orchestration becomes more demanding</b>.
          Explore the refactorings/introductions to answer the demands of
          deployment and orchestration.
        </p>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "left",
        }}
      >
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "rgba(60,118,225,0.75)" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#092256" }}>
              Enable continuous integration
            </Card.Title>
            <Card.Text style={{ color: "black" }}>
              With the migration to microservices, the number of services
              increased, but we want to have the system “production-ready”. We
              want to build and test the microservices and ensure their
              availability automatically. Continuous integration reduces the
              time of validating and releasing software, as we implement small
              and frequent changes.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "#092256" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
              Containerize services
            </Card.Title>
            <Card.Text style={{ color: "white" }}>
              One of the goals of dividing a system into microservices is to
              allow them to be completely independent. This means each
              microservice can be built using different technologies and,
              therefore, each microservice will need a different environment for
              its deployment. Containerization is a type of virtualization where
              a service can be deployed into a single container image and run
              isolated from the other services with its own desired environment.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "rgba(60,118,225,0.75)" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#092256" }}>
              {" "}
              Orchestrate service
            </Card.Title>
            <Card.Text style={{ color: "black" }}>
              The more microservices are created, the harder it is to manage all
              the microservices and the dependencies between them, as they all
              have different specificities. At some point, it becomes
              unmanageable to do this manually as to configuration are added
              availability, provisioning, scaling, etc. Thankfully,
              orchestration tools/frameworks allow you to specify all these
              behavioural wishes in a configuration file that starts a
              distributed cluster with the nodes specified, creates the system
              and runs it automatically.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "#092256" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
              Deploy into a cluster and orchestrate containers
            </Card.Title>
            <Card.Text style={{ color: "white" }}>
              Deploy all service’s instances into a cluster and orchestrate them
              with the least effort possible.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "rgba(60,118,225,0.75)" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#092256" }}>
              Centralize logging
            </Card.Title>
            <Card.Text style={{ color: "black" }}>
              Logs contribute to the easier diagnosis, debugging and issue
              tracking. They are usually stored in a log file in the source
              directory. If each microservice had its log file, the analysis of
              the execution of the entire system and debugging would be more
              challenging. Having a centralized logging infrastructure where we
              can view the logs produced by each microservices facilitates this.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card
          className="mx-3 my-2"
          style={{ height: "130px", backgroundColor: "#092256" }}
        >
          <Card.Body>
            <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
              Centralize Configuration
            </Card.Title>
            <Card.Text style={{ color: "white" }}>
              Each microservice can have its configuration files. Some of these
              configurations can sometimes be repeated for all microservices
              because there are configurations that are global to the system.
              When one of these global configurations changes, these changes
              must be propagated to all microservices, which is not ideal.
              Extracting these configurations into a configuration server
              centralizes the configurations, facilitating their modification.
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
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

export default Deployment;
