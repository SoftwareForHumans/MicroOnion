import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "../styles/service.css";

function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const [extract_services, setExtractServices] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`http://localhost:8000/projects/refactoringsSequence/${project}`)
        .then((res) => {
          setExtractServices(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container className="my-5 pb-5 col-major">
      <Row
        className="mt-5"
        style={{ justifyContent: "center", color: "#092256" }}
      >
        <p>
          {" "}
          Here we present the order by which we propose the services to be
          extracted. <br></br>
          <b>Click on each of them to find out how to extract them.</b>
        </p>
      </Row>

      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
        className="m-0 pt-5"
      >
        {extract_services.map((service, index) => (
          <>
            <Col className="my-2 ">
              <Link
                to="/extractService"
                state={{ projectName: project, service: service }}
                className="mt-4"
              >
                <Button size="lg" className="service">
                  {service.microservice}
                </Button>
              </Link>
            </Col>
            { index !== extract_services.length -1 &&
            <Col
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                color:"grey"
              }}
            >
              <MdKeyboardDoubleArrowRight
                size={"30px"}
                style={{ color: "#687f8c" }}
              ></MdKeyboardDoubleArrowRight>
            </Col>
}
          </>
        ))}
      </Row>
      <Row
        style={{ justifyContent: "center", color: "#092256" }}
        className="mt-5"
      >
        <p>
          In this scenario, we prioritized the services' extraction{" "}
          <b>from least to most coupled</b>, but other approaches are possible
          to decide this order.
        </p>
      </Row>
    </Container>
  );
}

export default ExtractionSequence;
