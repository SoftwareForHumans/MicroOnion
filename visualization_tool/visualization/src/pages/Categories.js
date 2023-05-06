import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Categories() {
  let { state } = useLocation();
  const project = state.projectName;

  return (
    <div>
      <h6 className="mt-5" style={{ color: "#092256" }}>
        Check our suggestions on the different concerns of the migration
      </h6>

      <Container
        className="text-center pt-4"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row className="m-0 p-0" style={{ color: "white" }}>
          <Col lg={3}>
            <Link to="/extractionSequence" state={{ projectName: project }}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#092256",
                  color: "white",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                }}
              >
                Extract Services
              </Button>
            </Link>
          </Col>
          <Col style={{ marginTop: "7rem" }} lg={3}>
            <Link to="/infrastructure" state={{ projectName: project }}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#1E488F",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                }}
              >
                Infrastructure Improvement
              </Button>
            </Link>
          </Col>
          <Col lg={3}>
            <Link to="/deployment" state={{ projectName: project }}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#3C76E1",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                }}
              >
                Deployment & Orchestration
              </Button>
            </Link>
          </Col>
          <Col style={{ marginTop: "7rem" }} lg={2}>
            <Link to="/principles" state={{ projectName: project }}>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#687f8c",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                }}
              >
                Check Microservices Architecture Characteristics
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <p style={{ color: "#1E488F" }}>
            These categories <b>are not</b> in any particular order and can be
            swapped out anytime you see fit.
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Categories;
