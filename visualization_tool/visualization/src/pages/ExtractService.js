import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loading, setLoading] = useState(true);
  const [sequence, setSequence] = useState();
  const [finalState, setFinalState] = useState();
  const [components, setComponents] = useState();

  
  function implementRefactoring() {
    setComponents();
  }

  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8000/projects/${project}/serviceDependencies/${service.microservice}`
        )
        .then((res) => {
          console.log(res.data);
          setFrom(res.data.from);
          setTo(res.data.to);
        });

      axios
        .get(
          `http://localhost:8000/projects/${project}/serviceExtraction/${service.microservice}`
        )
        .then((res) => {
          console.log(res.data);
          setFinalState(res.data.finalState);
          setSequence(res.data.sequence);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (
      from !== undefined &&
      sequence !== undefined &&
      finalState !== undefined
    )
      setLoading(false);
  }, [from, sequence, finalState]);

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <Container style={{ display: "flex", flexDirection: "row" }}>
            <Col
              className="mt-5"
              lg={1}
              style={{
                justifyContent: "start",
                alignItems: "start",
                display: "flex",
              }}
            >
              <Link
                to="/extractionSequence"
                state={{
                  service: service.microservice,
                  projectName: project,
                }}
                className="my-4"
              >
                <BsFillArrowLeftCircleFill
                  size={"40px"}
                  style={{ color: "#687f8c" }}
                ></BsFillArrowLeftCircleFill>
              </Link>
            </Col>
            <Col>
              <Container
                className="mt-3 mb-5"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Row>
                  <h4 className="mb-4">
                    Extract service {service.microservice}
                  </h4>

                  <h6>
                    To extract the service, identify the dependencies of the
                    service to the monolith and of the monolith to the service:
                  </h6>
                </Row>
                <Row
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Row className="mt-3 mb-2">
                    <h6>Service dependencies to the Monolith</h6>
                  </Row>
                  <table style={{ border: "2px solid #092256", width: "100%" }}>
                    <thead>
                      <tr>
                        <th className="px-3">Component</th>
                        <th className="px-3">Dependent File</th>
                        <th className="px-3">File</th>
                        <th className="px-3">Dependencies</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Tooltip id="file-name" />
                      {from.map(([key, dependency]) => {
                        return Object.keys(dependency).map((k) => {
                          let dep = dependency[k][0][0].split(".").pop();
                          let res = "";
                          return (
                            <tr>
                              <td className="px-3">{key}</td>
                              <td
                                className="px-3"
                                data-tooltip-id="file-name"
                                data-tooltip-content={dependency[k][0][0]}
                              >
                                {dep}
                              </td>

                              <td className="px-3">{k}</td>
                              {dependency[k][0].map((v, index) => {
                                if (v !== dependency[k][0][0]) {
                                  res += v;
                                  if (index !== dependency[k][0].length - 1) {
                                    res += ", ";
                                  }
                                }
                              })}
                              <td className="px-3">{res}</td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                  <Row className="mt-3 mb-2">
                    <h6>Service dependents from the Monolith</h6>
                  </Row>
                  <table style={{ border: "2px solid #092256", width: "100%" }}>
                    <thead>
                      <tr>
                        <th className="px-3">Component</th>
                        <th className="px-3">Dependent File</th>
                        <th className="px-3">File</th>
                        <th className="px-3">Dependencies</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Tooltip id="file-name" />
                      {to.map(([key, dependency]) => {
                        return Object.keys(dependency).map((k) => {
                          let dep = dependency[k][0][0].split(".").pop();
                          let res = "";
                          return (
                            <tr>
                              <td className="px-3">{key}</td>
                              <td
                                className="px-3"
                                data-tooltip-id="file-name"
                                data-tooltip-content={dependency[k][0][0]}
                              >
                                {dep}
                              </td>
                              <td className="px-3">{k}</td>
                              {dependency[k][0].map((v, index) => {
                                if (v !== dependency[k][0][0]) {
                                  res += v;
                                  if (index !== dependency[k][0].length - 1) {
                                    res += ", ";
                                  }
                                }
                              })}
                              <td className="px-3">{res}</td>
                            </tr>
                          );
                        });
                      })}
                    </tbody>
                  </table>
                </Row>

                <Row
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="my-5"
                >
                  <h6>
                    To extract this service, we suggest the following sequence
                    of refactorings (
                    <b>
                      click on each of them to find out how to implement them
                    </b>
                    ):
                  </h6>
                </Row>
                <Row  style={{
                    alignItems: "left",
                    justifyContent: "left",
                    display:"flex",
                  }}>
                  {sequence.map((item, index) => {
                    return (
                      <>
                        <Col className="my-2">
                          <Button
                            onClick={implementRefactoring}
                            key={item.name}
                            size="lg"
                            className="p-3"
                            style={{
                              backgroundColor: "#092256",
                              height: "20vh",
                              width: "20vh",
                              fontSize: "2vh",
                              borderRadius: "30%",
                              "box-shadow": "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            {item.name.charAt(0) +
                              item.name.slice(1).toLowerCase()}
                          </Button>
                        </Col>
                        {index !== sequence.length - 1 ? (
                          <Col
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                              display: "flex",
                            }}
                          >
                            <MdKeyboardDoubleArrowRight
                              size={"30px"}
                              style={{ color: "#687f8c" }}
                            ></MdKeyboardDoubleArrowRight>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </>
                    );
                  })}
                </Row>
                <Row
                  id="implementation"
                  className="mt-5"
                  style={{
                    width: "500px",
                    backgroundColor: "black",
                    height: "200px",
                  }}
                ></Row>
                <Link
                  to="/extractionSequence"
                  state={{
                    service: service.microservice,
                    projectName: project,
                  }}
                  className="my-4"
                >
                  <Button style={{ backgroundColor: "#092256" }} size="md">
                    Go back to extraction sequence
                  </Button>{" "}
                </Link>
              </Container>
            </Col>
          </Container>
        </>
      )}
    </>
  );
}

export default ExtractService;
