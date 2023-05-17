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
    <Container className="text-center pt-2 center-all flex-column">
      <p className="my-4 small-text" style={{ width: "80%" }}>
        This tool graphically displays the sequence of refactorings suggested
        for three Java Spring projects.
        <br></br>
        The goal is to improve the developer experience and provide additional
        information on how to conduct the migration.
        <br></br>
        <b>
          Please choose below the concern that you would like to address in the
          migration.
        </b>
      </p>

      <Row className="mx-0 px-0 mt-3 mb-2 text-white" >
        <Col lg={3}>
          <Link to="/chooseProject">
            <Button
              size="lg"
              onMouseEnter={handleMouseEnterExtract}
              onMouseLeave={handleMouseLeaveExtract}
              className="category-button"
              style={{
                backgroundColor: hoverExtract
                  ? "rgba(9, 34, 86, 0.85)"
                  : "#092256",
                borderColor: "#092256",
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
              className="category-button"
              style={{
                backgroundColor: hoverInfrastructure
                  ? "rgba(30, 72, 143, 0.85)"
                  : "#1E488F",
                borderColor: "#1E488F",
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
              className="category-button"
              style={{
                backgroundColor: hoverDeployment
                  ? "rgba(60,118,225,0.85)"
                  : "#3C76E1",
                borderColor: "#3C76E1",
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
              className="category-button"
              style={{
                backgroundColor: hoverCharacteristics
                  ? "rgba(104,127,140,0.85)"
                  : "#687f8c",
                borderColor: "#687f8c",
              }}
            >
              Check Microservices Architecture Characteristics
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-5 mb-4">
        <p className="small-text">
          These categories <b>are not</b> in any particular order and can be
          swapped out anytime you see fit.<br></br> We suggest a{" "}
          <b>Strangler Fig</b> approach to the migration, taking incremental
          steps that are reversible, reducing the risks.
        </p>
      </Row>
      <Row className="mb-5">
        <p className="small-text">
          Check the source code and documentation on{" "}
          <a href="https://github.com/RitaPeixoto/FEUP-Microservices_assisted_refactoring">
            Github
          </a>
        </p>
        <p className="small-text">
          Further documentation:{" "}
          <a href="https://www.google.com">here (dissertation)</a>
        </p>
      </Row>
    </Container>
  );
}

export default Categories;
