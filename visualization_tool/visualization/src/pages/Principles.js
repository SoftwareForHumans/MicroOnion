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
          alignItems: "center",
          justifyContent: "center",
          color: "#092256",
        }}
      >
        <h4>Characteristics of a Microservices Architecture, by Martin Fowler</h4>
        <p className="mt-2">
          
        </p>
      </Row>
    </Container>
  );
}

export default Principles;
