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
    "The authors argue that we should treat services as components since they can be deployed independently, thus if a service changes, only that service needs to be redeployed, not the entire application. “A service may consist of multiple processes that will always be developed and deployed together, such as an application process and a database that's only used by that service.”",
    "There are numerous ways to break a system down into different services. However, the authors state that  “The microservice approach to division is different, splitting up into services organized around business capability. Such services take a broad-stack implementation of software for that business area, including user-interface, persistent storage, and any external collaborations. Consequently the teams are cross-functional, including the full range of skills required for the development: user-experience, database, and project management.”",
    "Following up the line of thought of organizing the microservices around business capabilities, the authors believe that we should products over projects. This way, you don’t see the software development as completing a set of functionalities, but rather a way to make the most of the business capability. With typical small granularity of the services and each team owning a product over its lifetime and closer connection is built with the user.",
    'This trait is related to the shift in communication paradigms that occurs when we migrate to microservices. Since calls between microservices can cause increased latency, this structure must be carefully considered. The basis of communication in microservices is to make a request, which is then processed and applied some logic by the service receiving the request, which produces a response. According to the authors, communication is most typically implemented via HTTP request-response protocols with resource APIs or lightweight messaging. The first makes use of web principles and protocols. The second, a lightweight message bus, often only works as a message router ("dumb") and leaves the "smart" part to the endpoints, the services that will design a strategy to operate without introducing additional latency, which is common in service calls.',
    "As we split the monolith into microservices, each microservice can have its own stack of technologies, standards, and so on. It also opens the door to employing tools to handle the demands of each microservice, as well as using and developing open-source code that other developers can use to solve similar challenges. Decentralized governance allows each service to have its own governance strategy, which contributes to the reality that each team should own their product.",
    "Microservices decentralize both conceptual model and data storage decisions. “Microservices prefer letting each service manage its own database, either different instances of the same database technology or entirely different database systems”. This creates implications for managing updates, it can be solved by using transactions (even distribute transactions, when needed), but usually it is mitigated by assuming eventual consistency to answer the demand quickly and through compensating operations to deal with mistakes.",
    "Infrastructure automation solutions have grown substantially with the emergence of the cloud. Systems designed with microservices use Continuous Integration and Continuous Delivery strategies, which benefit greatly from infrastructure automation techniques. The most popular applications of infrastructure automation are automated testing, deployments, and microservices management in production.",
    "“A consequence of using services as components is that applications need to be designed to tolerate the failure of services. Any service call could fail due to the unavailability of the supplier, and the client has to respond to this as gracefully as possible”. Services fail frequently, and we must be able to detect and automatically restore them. This can be accomplished through real-time monitoring of the application and logging configurations for each service. The way we achieve this is not relevant,  but maintaining the system available is critical.",
    "When decomposing a monolith into microservices, we must keep the concepts of independent replacement and upgradeability in mind. Code that changes together should be in the same microservice, and code that changes rarely should be in a distinct microservice than code that changes regularly. If two services tend to change at the same time, they should generally be merged. It is also useful to use microservices when we know that something is going to be temporary, in this manner we build and deploy it fast and when it is no longer necessary we remove it, speeding up the release process. However, this raises the concern of one service breaking its consumers, so the services should be designed to be as tolerant as possible to the changes that their suppliers may suffer.",
  ];

  return (
    <Container className="mb-5">
      <Row className="my-4 px-5 center-all blue-text">
        <h4>
          Characteristics of a Microservices Architecture, by James Lewis and
          Martin Fowler
        </h4>
        <p className="mt-3 px-5">
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
            className="mb-4 pt-2 pb-4"
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
              <Card.Title
                className="mb-2"
                style={{ color: "#e6e6e6", fontSize: "1.1rem" }}
              >
                {title}
              </Card.Title>
              <Card.Text style={{ color: "white", fontSize: "0.9rem" }}>
                {texts[index]}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
      <Row className="my-4 pb-5 center-all blue-text">
        <p className="my-2">
          {" "}
          You can find{" "}
          <b>
            more information on the{" "}
            <a
              style={{ color: "#092256" }}
              href="https://drive.google.com/file/d/1OHzI64pzNWmRZ2t61A30LHS_ItqX4all/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              catalogue
            </a>{" "}
          </b>{" "}
          developed for source of this tool.
        </p>
      </Row>
    </Container>
  );
}

export default Principles;
