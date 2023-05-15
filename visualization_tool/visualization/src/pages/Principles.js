import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

function Principles() {
  const titles = [
    "Componentization via Services",
    "Organized around Business Capabilities",
    "Products, not Projects",
    "Smart endpoints and dumb pipes",
    "Decentralized Governance",
    "Decentralized Data Management",
    "Infrastructure Automation",
    "Design for failure",
    "Evolutionary Design",
  ];
  const texts = [
    "“A service may consist of multiple processes that will always be developed and deployed together, such as an application process and a database that's only used by that service.”",
    "“The microservice approach to division is different, splitting up into services organized around business capability. Such services take a broad-stack implementation of software for that business area, including user-interface, persistent storage, and any external collaborations. Consequently the teams are cross-functional, including the full range of skills required for the development: user-experience, database, and project management.”",
    "“Microservice proponents tend to avoid this project model, preferring instead the notion that a team should own a product over its full lifetime.[...] The product mentality ties in with the linkage to business capabilities. Rather than looking at the software as a set of functionality to be completed, there is an on-going relationship where the question is how can software assist its users to enhance the business capability.”",
    "This characteristic has to do with the change of the paradigm in communication when we migrate to microservices. As the calls between microservices can create an increasing latency, this structure has to be well thought out. Martin Fowler describes that communication is most commonly implemented through either HTTP request-response protocols with resource API’s or lightweight messaging. The first one uses the world wide web principles and protocols. The second one, a lightweight message bus, typically only acts as a message router (“dumb”) and leaves the “smart” part to the endpoints. ",
    "As we split the monolith into microservices, each microservice can have a different stack of technologies, standards, etc. It also opens the possibility of using tools to solve each microservice's needs and using and producing open-source code, so other developers can use it to solve similar problems. Each service can have its governance plan.",
    "“Microservices prefer letting each service manage its own database, either different instances of the same database technology or entirely different database systems”. This creates implications for managing updates, usually mitigated by assuming eventual consistency to answer the demand quickly and through compensating operations to deal with mistakes. Fowler also presents that “each microservice must have a private and independent database”.",
    "With the evolution of the cloud, infrastructure automation techniques have evolved enormously. Systems being built with microservices are being built with Continuous Integration and Continuous Delivery techniques that benefit a lot from infrastructure automation techniques. Automated tests and deployments are the most common uses of infrastructure automation and managing microservices in production.",
    "A consequence of using services as components is that applications need to be designed to tolerate the failure of services. Any service call could fail due to the unavailability of the supplier, and the client has to respond to this as gracefully as possible. Services fail many times, and we have to be able to detect them and automatically restore them. This can be done by real-time monitoring of the application and logging setups for each service. This can be done in many ways, but keeping the system available is vital.",
    "When breaking a monolith into microservices, we need to remember the notion of independent replacement and upgradeability. Code that changes together should be in the same microservice, and the code that changes rarely should be in a different microservice than the code that tends to change more frequently. If two services tend to change together, they should probably be merged. This way, we can redeploy only the modified services, simplifying and speeding up the releases. This raises the concern of one service breaking its consumers, so the services should be designed to be as tolerant as possible to the changes their suppliers may suffer.",
  ];

  return (
    <Container className="mb-5">
      <Row
        className="my-4 px-5"
        style={{
          display: "flex",
          alignlis: "center",
          justifyContent: "center",
          color: "#092256",
        }}
      >
        <h4>
          Characteristics of a Microservices Architecture, by James Lewis and
          Martin Fowler
        </h4>
        <p className="mt-3" style={{ width: "85%" }}>
          <b>James Lewis</b> and <b>Martin Fowler</b> present a list of the
          common Characteristics of a Microservices Architecture, although they
          state that{" "}
          <b>
            “[...] not all microservice architectures have all the
            characteristics, but we do expect that most microservice
            architectures exhibit most characteristics.”
          </b>
          .
        </p>
      </Row>
      <Row className="center-all">
        {titles.map((title, index) => (
          <Card
            className="mx-3 mb-4 pt-2 pb-4"
            style={{
              width: "85%",
              backgroundColor:
                index % 2 === 0
                  ? "rgba(30,72,143, 0.75)"
                  : "rgba(9,34,86, 0.9)",
              borderColor: index % 2 === 0 ? "#1E488F" : "#092256",
            }}
          >
            <Card.Body>
              <Card.Title className="mb-2" style={{ color: "#c0c0c0" }}>
                {title}
              </Card.Title>
              <Card.Text style={{ color: "white" }}>{texts[index]}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Row className="my-4 pb-5 center-all " style={{ color: "#092256" }}>
        <p className="my-2">
          {" "}
          You can find <b>more information on the catalog (link)</b> developed
          for source of this tool.
        </p>
      </Row>
    </Container>
  );
}

export default Principles;
