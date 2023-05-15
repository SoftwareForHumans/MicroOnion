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

  function implementRefactoring() {
    return;
  }

  function createArrayElement(arr) {
    let res = [];
    for (let [key, listOfDependencies] of arr) {
      let el = [];
      const size = listOfDependencies.length;
      el.push(
        <td className="px-3" rowSpan={size}>
          {key}
        </td>
      );
      Object.keys(listOfDependencies).map((k) => {
        if (el.length > 1) {
          el = [];
          el.push(<td></td>);
        }
        let dep = listOfDependencies[k][0][0].split(".").pop();
        let deps = "";
        el.push(
          <td
            className="px-3"
            style={{
              borderRight: "2px solid #092256",
              borderLeft: "2px solid #092256",
            }}
          >
            {k}
          </td>
        );
        el.push(
          <td
            className="px-3"
            data-tooltip-id="file-name"
            data-tooltip-content={listOfDependencies[k][0][0]}
            style={{ borderRight: "2px solid #092256" }}
          >
            {dep}
          </td>
        );

        listOfDependencies[k][0].map((v, index) => {
          if (v !== listOfDependencies[k][0][0]) {
            deps += v;
            if (index !== listOfDependencies[k][0].length - 1) {
              deps += ", ";
            }
          }
        });
        el.push(<td className="px-3">{deps}</td>);
        res.push(el);
      });
    }

    return res;
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
    if (finalState !== undefined) {
      setLoading(false);
    }
  }, [from, to, sequence, finalState]);

  return (
    <>
      <Container
        className="mb-5"
        style={{ display: "flex", flexDirection: "row", color: "#092256" }}
      >
        <div
          style={{
            justifyContent: "start",
            alignItems: "start",
            display: "flex",
            position: "fixed",
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
              className="pe-3"
            ></BsFillArrowLeftCircleFill>
          </Link>
        </div>
        <div
          className="mt-3 mb-5 ms-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Row>
            <h4 className="mb-4">Extract service {service.microservice}</h4>
            <Link
              to="/showState"
              state={{ projectName: project, stateObject: finalState }}
            >
              <Button
                className="mb-3"
                size="sm"
                style={{
                  color: "#1E488F",
                  borderColor: "#1E488F",
                  backgroundColor: "#FFFFFF",
                  fontWeight: "bold",
                }}
              >
                Check the initial state of the component
              </Button>
            </Link>
            <p style={{ fontSize: "0.95rem" }}>
              To extract the service, identify the dependencies of the service
              to the monolith and of the monolith to the service:
            </p>
          </Row>
          {loading ? (
            <></>
          ) : (
            <>
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
                {from === undefined || from.length === 0 ? (
                  <>
                    <p>
                      There are no dependencies of this component to the
                      Monolith
                    </p>
                  </>
                ) : (
                  <table style={{ border: "2px solid #092256", width: "100%" }}>
                    <thead>
                      <tr
                        style={{
                          border: "2px solid #092256",
                          backgroundColor: "#092256",
                          color: "white",
                        }}
                      >
                        <th className="px-3">Component</th>
                        <th className="px-3">File</th>
                        <th className="px-3">Dependency</th>
                        <th className="px-3">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Tooltip id="file-name" />

                      {createArrayElement(from).map((obj) => (
                        <tr>{obj}</tr>
                      ))}
                    </tbody>
                  </table>
                )}

                <Row className="mt-3 mb-2">
                  <h6>Service dependents from the Monolith</h6>
                </Row>
                {to === undefined || to.length === 0 ? (
                  <>
                    <p>
                      There are no dependencies of this component to the
                      Monolith
                    </p>
                  </>
                ) : (
                  <table style={{ border: "2px solid #092256", width: "100%" }}>
                    <thead>
                      <tr
                        style={{
                          border: "2px solid #092256",
                          backgroundColor: "#092256",
                          color: "white",
                        }}
                      >
                        <th
                          className="px-3"
                          style={{ borderRight: "2px solid #092256" }}
                        >
                          Component
                        </th>
                        <th
                          className="px-3"
                          style={{ borderRight: "2px solid #092256" }}
                        >
                          File
                        </th>
                        <th
                          className="px-3"
                          style={{ borderRight: "2px solid #092256" }}
                        >
                          Dependency
                        </th>
                        <th
                          className="px-3"
                          style={{ borderRight: "2px solid #092256" }}
                        >
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <Tooltip id="file-name" />
                      {createArrayElement(to).map((obj) => (
                        <tr>{obj}</tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Row>

              {sequence === undefined || sequence.length === 0 ? (
                <>
                  <br></br>
                  <p>
                    As there are no dependencies, there are no refactorings to
                    apply. We simply extract the service.
                  </p>
                </>
              ) : (
                <>
                  <Row
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    className="my-5"
                  >
                    <p style={{ fontSize: "0.95rem" }}>
                      To extract this service, we suggest the following sequence
                      of refactorings (
                      <b>
                        click on each of them to find out how to implement them
                      </b>
                      ):
                    </p>
                  </Row>
                  <Row
                    style={{
                      display: "inline-block",
                      justifyContent: "start",
                    }}
                  >
                    {sequence.map((item, index) => {
                      return (
                        <>
                          <Col className="d-inline">
                            <Button
                              onClick={implementRefactoring}
                              key={item.name}
                              size="lg"
                              className="mb-3 p-2"
                              style={{
                                backgroundColor: "#092256",
                                borderColor: "#092256",
                                height: "12vh",
                                width: "12vh",
                                fontSize: "0.8rem",
                                borderRadius: "12%",
                                boxShadow: "0 0 1em 0 rgba(0, 0, 0, 0.2)",
                              }}
                            >
                              {item.name.charAt(0) +
                                item.name.slice(1).toLowerCase()}
                            </Button>
                            {index !== sequence.length - 1 ? (
                              <MdKeyboardDoubleArrowRight
                                size={"20px"}
                                className="d-inline ms-3"
                                style={{ color: "#687f8c" }}
                              ></MdKeyboardDoubleArrowRight>
                            ) : (
                              <></>
                            )}
                          </Col>
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
                </>
              )}
            </>
          )}
          <Link
            to="/showState"
            state={{ projectName: project, stateObject: finalState }}
          >
            <Button
              className="mt-5 mb-3"
              size="sm"
              style={{
                color: "#1E488F",
                borderColor: "#1E488F",
                backgroundColor: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              Check the final state of the service extracted
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default ExtractService;
