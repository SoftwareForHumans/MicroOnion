import React, { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from 'axios';

function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName;

  const getProject = () => {
    axios.get(`http://localhost:8000/projects/${project}`).then((res) => {
      console.log(res.data)
    });
  }
  useEffect(() => {
    getProject();
  });


  return (
    <div className="my-4">
      <Row style={{ justifyContent: "center" }}>
        We identified the dependencies of each microservice and decided to
        extract by order of the microservice with the least number of
        dependencies
      </Row>
      <div
        style={{
          display: "block",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "5%",
        }}
      >
        <Row style={{ color: "white" }}>
          <Col className="my-2">
            <Link to="/" state={{ projectName: project }} className="mt-4">
              <Button
                size="lg"
                style={{
                  backgroundColor: "#3C76E1",
                  height: "35vh",
                  width: "35vh",
                }}
              >
                Extract Service 0
              </Button>
            </Link>
          </Col>
          <Col className="my-2">
            <Button
              size="lg"
              disabled
              style={{
                backgroundColor: "#3C76E1",
                height: "35vh",
                width: "35vh",
              }}
            >
              Extract Service 1
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ExtractionSequence;
