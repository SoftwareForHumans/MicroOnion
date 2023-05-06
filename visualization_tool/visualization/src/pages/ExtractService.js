import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8000/projects/${project}/serviceDependencies/${service.microservice}`
        )
        .then((res) => {
            const obj = Object.create(res.data)
            console.log(obj.from)
            setFrom(obj.from);
            setTo(obj.to);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Container>
      <Row>
        <h4>Extract service {service.microservice}</h4>
        <h6>
          To extract the service, identify the dependencies to the monolith and
          of the monolith to the service
        </h6>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col>
          <Row>Service dependencies</Row>
          
          {/* {from.map((key) =>(
            <div> {key}</div>
          ))} */}
         
        </Col>
        <Col>
          <Row>Service dependents</Row>
        </Col>
      </Row>
      <Row
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        To extract this service, we suggest the following sequence of
        refactorings
      </Row>
      <Row>
        {/* cards com o refactoring e com quem é feito, ao clicar no refactoring nasce por baixo a sua representação */}
      </Row>
    </Container>
  );
}

export default ExtractService;
