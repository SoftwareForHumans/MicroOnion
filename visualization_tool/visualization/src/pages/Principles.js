import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Principles() {
  let { state } = useLocation();
  const project = state.projectName;
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
          Characteristics of a Microservices Architecture, by Martin Fowler
        </h4>
        <p className="mt-2">
          Martin Fowler presents here the common Characteristics of a
          Microservices Architecture, although he states that “[...] not all
          microservice architectures have all the characteristics, but we do
          expect that most microservice architectures exhibit most
          characteristics.”.
        </p>
        <p>TODO: pensar como mostrar e analisar isto</p>
        <ul>
          <li>Componentization via Services</li>
          <li>Organized around Business Capabilities</li>
          <li>Products, not Projects</li>
          <li>Smart endpoints and dumb pipes</li>
          <li>Decentralized Governance</li>
          <li>Decentralized Data Management</li>
          <li>Infrastructure Automation</li>
          <li>Design for failure</li>
          <li>Evolutionary Design</li>
        </ul>
      </Row>
    </Container>
  );
}

export default Principles;
