import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const [extract_services, setExtractServices] = useState([]);
  const [current_service, setCurrentService] = useState();

  function checkIfDisabled(microservice){
    return current_service !== microservice
  }

  useEffect(() => {
    try {
      axios.get(`http://localhost:8000/projects/refactoringsSequence/${project}`).then((res) => {
        setExtractServices(res.data);
        console.log(res.data);
        setCurrentService(res.data[0].microservice)
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container className="my-4">
      <Row className="mt-5" style={{ justifyContent: "center", color: "#092256" }}>
        <p>To begin extracting service, we must first understand <b>what makes the service dependent on the monolith</b>. The first step in extracting a service is to identify all of its dependencies.</p>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          alignItems: "left",
          justifyContent: "center",
          paddingTop: "5%",
        }}
      >
        <Row style={{ color: "white" }}>
          { extract_services.map((service) => (
            <Col className="my-2">
            <Link to="/extractService" state={{ projectName: project, service: service}} className="mt-4">
              <Button
                size="lg"
                style={{
                  backgroundColor: "#1E488F",
                  height: "20vh",
                  width: "20vh",
                  borderRadius: '50%'
                }}
                disabled = {checkIfDisabled(service.microservice)}
              >
                Extract Service {service.microservice}
              </Button>
            </Link>
          </Col>
          ))
          }
        </Row>
      </div>
      <Row className="my-5" style={{ justifyContent: "center", color: "#092256" }}>
        <p>In this scenario, we prioritized the breaking of dependencies <b>from least to most coupled</b>. Other approaches are possible.</p>
      </Row>
    </Container>
  );
}

export default ExtractionSequence;
