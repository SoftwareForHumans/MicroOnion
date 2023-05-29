import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Refactoring from "../components/Refactoring";
import RefactoringButton from "../components/RefactoringButton";
import DependenciesTable from "../components/DependenciesTable";
import { Oval } from "react-loading-icons";

import monolith from "../assets/monolith.png";
import microservices from "../assets/monolithAndExtractedService.png";
import arrow from "../assets/arrow.png";

function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const index = state.index;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingRefactoring, setLoadingRefactoring] = useState();
  const [sequence, setSequence] = useState();
  const [initialState, setInitialState] = useState();
  const [finalState, setFinalState] = useState();
  const [selected, setSelected] = useState(null);
  const [refactoringItems, _setRefactoringItems] = useState(null);
  const [refactoringItems2, _setRefactoringItems2] = useState(null);

  const [showInitialState, setShowInitialState] = useState(false);
  const [showFinalState, setShowFinalState] = useState(false);
  const [showSequence, setShowSequence] = useState(false);
  const [scrollToElementId, setScrollToElement] = useState();

  const scrollToElement = (id) => {
    let element = document.getElementById(id);
    let header = document.getElementById("header");
    if (element) {
      setTimeout(scroll, 500);
      function scroll() {
        window.scrollTo(element.offsetLeft, element.offsetTop - header.offsetHeight);
        setScrollToElement('');
      }
    }
  }


  const handleOnClick = (idx) => {
    setLoadingRefactoring(true);
    setScrollToElement('implementation');
    setSelected(idx);
    let id = sequence[idx].id;
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/getRefactoringImage/${service.microservice}/${id}`,
          {
            headers: {
              "Content-Type": "image/png",
            },
          }
        )
        .then((res) => {
          _setRefactoringItems({
            selected: undefined,
            sequence: sequence,
            index: idx,
            color: undefined,
            image: res.data,
          });
          _setRefactoringItems2({
            selected: undefined,
            sequence: undefined,
            index: undefined,
            color: undefined,
            image: undefined,
          });
          setLoadingRefactoring(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/serviceDependencies/${service.microservice}/${index}`
        )
        .then((res) => {
          setFrom(res.data.from);
          setTo(res.data.to);
        });

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/serviceExtraction/${service.microservice}`
        )
        .then((res) => {
          setSequence(res.data.sequence);
        });
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/getInitialState/${service.microservice}/${index}`,
          {
            headers: {
              "Content-Type": "image/png",
            },
          }
        )
        .then((res) => {
          setInitialState(res.data);
        });

      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/getFinalState/${service.microservice}/${index}`,
          {
            headers: {
              "Content-Type": "image/png",
            },
          }
        )
        .then((res) => {
          setFinalState(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  }, [project, service, index]);

  useEffect(() => {
    if (finalState !== undefined && initialState !== undefined) {
      setLoading(false);
    }
  }, [finalState, initialState]);

  useEffect(() => {
    scrollToElement(scrollToElementId);
  }, [scrollToElementId]);

  return (
    <>
      <Container className="blue-text d-flex flex-row">
        <Col
          className="position-fixed"
          style={{
            transform:"translate(-40px,-65px)",
            zIndex: 1
          }}>
          <Link
            to="/extractionSequence"
            state={{
              service: service.microservice,
              projectName: project,
            }}
            className="my-4"
          >
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
            <Col className="full-height d-flex justify-content-center flex-column">
              <Row className="m-4">
                <h4 className="mb-4 center-all">
                  Extract service {service.microservice}
                </h4>
                <p style={{ fontSize: "0.95rem" }}>
                  To extract the service, you need to identify the dependencies
                  of the service to the monolith and of the monolith to the
                  service.
                </p>
              </Row>
              <Row className="m-4 mx-0">
                <Col className="display-flex justify-content-end">
                  <div className="display-flex flex-column">
                    <div className="display-flex full-height justify-content-center align-items-center mb-3">
                      <img
                        src={monolith}
                        style={{ width: "200px" }}
                        alt="monolith"
                      ></img>
                    </div>
                    <Button
                      className="px-3 choose-project-buttons"
                      onClick={() => {
                        setShowInitialState(true);
                        setShowFinalState(false);
                        setShowSequence(false);
                        setScrollToElement('initialStateSection');
                      }}
                    >
                      Check component's initial state
                    </Button>
                  </div>
                </Col>
                <Col className="display-flex justify-content-center">
                  <div className="display-flex flex-column">
                    <div className="display-flex full-height justify-content-center align-items-center mb-3">
                      <img
                        src={arrow}
                        style={{ width: "200px", height: "60px" }}
                        alt="arrow"
                      ></img>
                    </div>
                    <Button
                      className="px-3 choose-project-buttons"
                      onClick={() => {
                        setShowInitialState(false);
                        setShowFinalState(false);
                        setShowSequence(true);
                        setScrollToElement('sequenceSection');
                      }}
                    >
                      Show Proposed Refactoring Sequence
                    </Button>{" "}
                  </div>
                </Col>
                <Col className="display-flex justify-content-start">
                  <div className="display-flex flex-column ">
                    <div className="mb-4">
                      <img src={microservices} style={{ width: "270px" }} alt="microservices"></img>
                    </div>
                    <Button
                      className="px-3 choose-project-buttons"
                      onClick={() => {
                        setShowInitialState(false);
                        setShowFinalState(true);
                        setShowSequence(false);
                        setScrollToElement('finalStateSection');
                      }}
                    >
                      Check component's final state
                    </Button>
                  </div>
                </Col>
              </Row>

              <Row id="initialStateSection" className="mx-auto">
                {showInitialState && (
                  <>
                    <div className="my-5">
                      <div className="p-4 text-white information-box">
                        <h5
                          style={{ color: "#e6e6e6", fontSize: "1.3rem" }}
                          className="mb-4"
                        >
                          {" "}
                          Component's initial state
                        </h5>
                        <img
                          style={{ width: "100%" }}
                          src={`data:image/png;base64,${initialState}`}
                          alt="Initial state"
                        ></img>
                        <Row className="mt-3 mb-2">
                          <h6>Service dependencies to the Monolith</h6>
                        </Row>
                        {from === undefined || from.length === 0 ? (
                          <>
                            <p className="blue-text">
                              There are no dependencies of this component to the
                              Monolith
                            </p>
                          </>
                        ) : (
                          <DependenciesTable tableContent={from}></DependenciesTable>
                        )}
                        <Row className="mt-3 mb-2">
                          <h6>Service dependents from the Monolith</h6>
                        </Row>
                        {to === undefined || to.length === 0 ? (
                          <>
                            <p className="blue-text">
                              There are no dependencies of this component to the
                              Monolith
                            </p>
                          </>
                        ) : (
                          <DependenciesTable tableContent={to}></DependenciesTable>
                        )}
                      </div>

                    </div>
                  </>
                )}
              </Row>

              <Row id="finalStateSection" className="mx-auto">
                {showFinalState && (
                  <>
                    <div className="my-5">
                      <div className="p-4 text-white information-box">
                        <h5
                          style={{ color: "#e6e6e6", fontSize: "1.3rem" }}
                          className="mb-4"
                        >
                          {" "}
                          Extracted Component's Final state
                        </h5>
                        <img
                          style={{ width: "100%" }}
                          src={`data:image/png;base64,${finalState}`}
                          alt="Final state"
                        ></img>
                      </div>
                    </div>
                  </>
                )}
              </Row>

              <Row id="sequenceSection" className="mx-auto">
                {showSequence && (
                  <>
                    <div className="my-5">
                      <div className="p-4 text-white information-box">
                        {" "}
                        {sequence === undefined || sequence.length === 0 ? (
                          <>
                            <br></br>
                            <p>
                              As there are no dependencies, there are no refactorings
                              to apply. We simply extract the service.
                            </p>
                          </>
                        ) : (
                          <>
                            <Row className="center-all mb-5">
                              <p style={{ fontSize: "0.95rem" }}>
                                To extract this service, we suggest the following
                                sequence of refactorings (
                                <b>
                                  click on each of them to find out how to apply them
                                </b>
                                ):
                              </p>
                            </Row>
                            <Row className="d-inline">
                              {sequence.map((item, idx) => {
                                return (
                                  <>
                                    <RefactoringButton
                                      key={idx}
                                      item={item}
                                      handleClick={handleOnClick}
                                      sequence={sequence}
                                      index={idx}
                                      active={selected === idx}
                                      color="#092256"
                                    ></RefactoringButton>
                                  </>
                                );
                              })}
                            </Row>

                            <Row id="implementation">
                              {loadingRefactoring !== undefined && (
                                <>
                                  <div className="mx-auto my-3"
                                    style={{
                                      border: "3px dashed #092256",
                                      width: "90%",
                                      backgroundColor: "white",
                                    }}>
                                    {loadingRefactoring ? (
                                      <Oval
                                        className="my-5"
                                        stroke="#092256"
                                        strokeOpacity={1}
                                        strokeWidth={10}
                                      />
                                    ) : (
                                      <Refactoring
                                        project={project}
                                        service={service}
                                        refactoringItems={refactoringItems}
                                        setRefactoringItems={_setRefactoringItems}
                                        refactoringItems2={refactoringItems2}
                                        setRefactoringItems2={_setRefactoringItems2}
                                        showNumber={true}
                                      ></Refactoring>
                                    )}
                                  </div>

                                </>
                              )}
                            </Row>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </Row>
            </Col>
          </>
        )}
      </Container>
    </>
  );
}

export default ExtractService;
