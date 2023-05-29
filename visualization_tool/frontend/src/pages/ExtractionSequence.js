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
import { Oval } from "react-loading-icons";

function ExtractionSequence() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const [loading, setLoading] = useState(true);
  const [extract_services, setExtractServices] = useState([]);
  const [extract_services_len, setExtractServicesLen] = useState();

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/refactoringsSequence/${project}`
        )
        .then((res) => {
          setExtractServicesLen(res.data.length);
          setExtractServices(res.data);          
        });
    } catch (err) {
      console.log(err);
    }
  }, [project]);

  useEffect(() => {
    if (extract_services.length === extract_services_len) {
      setLoading(false);
    }
  }, [extract_services, extract_services_len]);

  return (
    <Container className="blue-text">
      <Col
        className="position-fixed"
        style={{
            transform:"translate(-40px,-65px)",
            zIndex: 1
          }}
      >
        <Link to="/chooseProject" className="my-4">
          <BsFillArrowLeftCircleFill
            size={"50px"}
            style={{ color: "#80AAF8" }}
            className="pe-3"
          ></BsFillArrowLeftCircleFill>
        </Link>
      </Col>
      {loading ? (
        <Col className="full-height d-flex justify-content-center flex-column">
          <Row className="m-4">
            <Oval
              className="center-all"
              stroke="#092256"
              strokeOpacity={1}
              strokeWidth={10}
            />
          </Row>
        </Col>
      ) : (
        <>
          <div className="full-height d-flex mt-5 flex-column">
            <Row className="mt-4">
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
          </div>
        </>
      )}
    </Container>
  );
}

export default ExtractionSequence;
