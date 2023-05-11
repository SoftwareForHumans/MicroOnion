import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
function Categories() {
  const [hoverExtract, setHoverExtract] = useState(false);
  const [hoverInfrastructure, setHoverInfrastructure] = useState(false);
  const [hoverDeployment, setHoverDeployment] = useState(false);
  const [hoverCharacteristics, setHoverCharacteristics] = useState(false);
  const handleMouseEnterExtract = () => {
    setHoverExtract(true);
  };
  const handleMouseLeaveExtract = () => {
    setHoverExtract(false);
  };
  const handleMouseEnterInfrastructure = () => {
    setHoverInfrastructure(true);
  };
  const handleMouseLeaveInfrastructure = () => {
    setHoverInfrastructure(false);
  };
  const handleMouseEnterDeployment = () => {
    setHoverDeployment(true);
  };
  const handleMouseLeaveDeployment = () => {
    setHoverDeployment(false);
  };
  const handleMouseEnterCharacteristics = () => {
    setHoverCharacteristics(true);
  };
  const handleMouseLeaveCharacteristics = () => {
    setHoverCharacteristics(false);
  };

  return (
    <div>
      <h6 className="mt-4" style={{ color: "#092256" }}>
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
            <Link to="/chooseProject">
              <Button
                size="lg"
                onMouseEnter={handleMouseEnterExtract}
                onMouseLeave={handleMouseLeaveExtract}
                style={{
                  backgroundColor: hoverExtract? "#092256": "rgba(9, 34, 86, 0.7)",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                  "box-shadow": "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                Extract Services
              </Button>
            </Link>
          </Col>
          <Col style={{ marginTop: "7rem" }} lg={3}>
            <Link to="/infrastructure">
              <Button
                size="lg"
                onMouseEnter={handleMouseEnterInfrastructure}
                onMouseLeave={handleMouseLeaveInfrastructure}
                style={{
                  backgroundColor: hoverInfrastructure? "#1E488F": "rgba(30, 72, 143, 0.7)",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                  "box-shadow": "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                Infrastructure Improvement
              </Button>
            </Link>
          </Col>
          <Col lg={3}>
            <Link to="/deployment">
              <Button
                size="lg"
                onMouseEnter={handleMouseEnterDeployment}
                onMouseLeave={handleMouseLeaveDeployment}
                style={{
                  backgroundColor: hoverDeployment?"#3C76E1":"rgba(60,118,225,0.7)",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                  "box-shadow": "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                Deployment & Orchestration
              </Button>
            </Link>
          </Col>
          <Col style={{ marginTop: "7rem" }} lg={2}>
            <Link to="/principles">
              <Button
                size="lg"
                onMouseEnter={handleMouseEnterCharacteristics}
                onMouseLeave={handleMouseLeaveCharacteristics}
                style={{
                  backgroundColor: hoverCharacteristics? "#687f8c":"rgba(104,127,140,0.7)",
                  height: "30vh",
                  width: "35vh",
                  borderRadius: "30px",
                  "box-shadow": "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                }}
              >
                Check Microservices Architecture Characteristics
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="my-4 pb-5">
          <p className="mb-2" style={{ color: "#1E488F" }}>
            These categories <b>are not</b> in any particular order and can be
            swapped out anytime you see fit.<br></br> We suggest a{" "}
            <b>Strangler Fig</b> approach to the migration, taking incremental
            steps that are reversible, reducing the risks.
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Categories;
