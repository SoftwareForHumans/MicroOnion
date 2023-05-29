import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const [extract_services, setExtractServices] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/refactoringsSequence/${project}`
        )
        .then((res) => {
          setExtractServices(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [project]);

  return (
    <Container className="mb-5 d-flex flex-row blue-text">
      <div className="justify-content-start align-items-start d-flex position-fixed">
        <Link to="/chooseProject" className="my-4">
          <BsFillArrowLeftCircleFill
            size={"40px"}
            style={{ color: "#687f8c" }}
            className="pe-3"
          ></BsFillArrowLeftCircleFill>
        </Link>
      </div>
      <div className="mt-3 mb-5 ms-2 center-all flex-column">
        <Row className="center-all">
          <h4 className="mb-4"> Proposed Refactoring Sequence</h4>
          <p>
            {" "}
            Apply the Extract Service Refactoring in the following order, to
            extract each of the services from least to most coupled. <br></br>
            <b>
              Click on each of the services to find out how to extract them.
            </b>
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
                state={{ projectName: project, service: service, index: index }}
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
        {/* <Row style={{ justifyContent: "center" }} className="mt-5">
          <p>
            In this scenario, we prioritized the services' extraction{" "}
            <b>from least to most coupled</b>, but other approaches are possible
            to decide this order.
          </p>
        </Row> */}
      </div>
    </Container>
  );
}

export default ExtractionSequence;
