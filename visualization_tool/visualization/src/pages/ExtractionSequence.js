import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const [extract_services, setExtractServices] = useState([]);

  useEffect(() => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL)
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}projects/refactoringsSequence/${project}`)
        .then((res) => {
          setExtractServices(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [project]);

  return (
    <Container className="my-5 pb-5">
      <Row
        className="mt-5"
        style={{ justifyContent: "center", color: "#1E488F" }}
      >
        <p>
          {" "}
          Here we present the order by which we propose the services to be
          extracted, applying the Extract Service refactoring. <br></br>
          <b>Click on each of the services to find out how to extract them.</b>
        </p>
      </Row>

      <Row
        style={{
          display: "inline-block",
          flexDirection: "row",
          justifyContent: "start",
          color: "white",
        }}
        className="m-0 pt-5"
      >
        {extract_services.map((service, index) => (
          <Col className="d-inline" key={index}>
            <Link
              to="/extractService"
              state={{ projectName: project, service: service }}
            >
              <Button size="lg" className="service my-2">
                {service.microservice}
              </Button>
            </Link>
            {index !== extract_services.length - 1 && (
              <MdKeyboardDoubleArrowRight
                size={"30px"}
                className="ms-4"
                style={{ color: "#687f8c" }}
              ></MdKeyboardDoubleArrowRight>
            )}
          </Col>
        ))}
      </Row>
      <Row
        style={{ justifyContent: "center", color: "#1E488F" }}
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
