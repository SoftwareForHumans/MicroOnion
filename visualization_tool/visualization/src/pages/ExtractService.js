import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Refactoring from "../components/Refactoring";
import RefactoringButton from "../components/RefactoringButton";
import DependenciesTable from "../components/DependenciesTable";

import initial from "../assets/service0_start.png";
import final from "../assets/service0_end.png";

function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const index = state.index;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loading, setLoading] = useState(true);
  const [sequence, setSequence] = useState();
  const [finalState, setFinalState] = useState();
  const [refactoring, setRefactoring] = useState();
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const [selected2, setSelected2] = useState(undefined);
  const [step, setStep] = useState(undefined);
  const [color, setColor] = useState(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseFinal = () => setShowFinal(false);
  const handleShowFinal = () => setShowFinal(true);

  const handleOnClick = (index) => {
    setSelected(index);
    setRefactoring(index);
    setColor(undefined);
    setStep(undefined);
    setSelected2(undefined);
  };

  useEffect(() => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/serviceDependencies/${service.microservice}`
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
          setFinalState("res.data.finalState");//TODO: change this
          setSequence(res.data.sequence);
        });
    } catch (err) {
      console.log(err);
    }
  }, [project, service]);

  useEffect(() => {
    if (finalState !== undefined) {
      setLoading(false);
    }
  }, [from, to, sequence, finalState]);

  return (
    <>
      <Container className="mb-5 d-flex flex-row blue-text">
        <div className="justify-content-start align-items-start d-flex position-fixed">
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
        <div className="mt-3 mb-5 ms-2 center-all flex-column">
          <Row className="center-all">
            <h4 className="mb-4">Extract service {service.microservice}</h4>
            <Button
              className="my-3 modal-button"
              size="sm"
              onClick={handleShow}
            >
              {" "}
              Check the initial state of the component
            </Button>

            <Modal
              size="xl"
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  Component {service.microservice} initial state{" "}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  className="mt-5"
                  style={{ width: "100%" }}
                  src={initial}
                  alt="Initial state"
                ></img>
              </Modal.Body>
            </Modal>
            <p style={{ fontSize: "0.95rem" }}>
              To extract the service, identify the dependencies of the service
              to the monolith and of the monolith to the service:
            </p>
          </Row>
          {loading ? (
            <></>
          ) : (
            <>
              <Row className="center-all flex-column">
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
                  <DependenciesTable tableContent={from}></DependenciesTable>
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
                  <DependenciesTable tableContent={to}></DependenciesTable>
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
                  <Row className="center-all my-5">
                    <p style={{ fontSize: "0.95rem" }}>
                      To extract this service, we suggest the following sequence
                      of refactorings (
                      <b>click on each of them to find out how to apply them</b>
                      ):
                    </p>
                  </Row>
                  <Row className="d-inline mx-5">
                    {sequence.map((item, index) => {
                      return (
                        <>
                          <RefactoringButton
                            item={item}
                            handleClick={handleOnClick}
                            sequence={sequence}
                            index={index}
                            active={selected === index}
                            color="#092256"
                          ></RefactoringButton>
                        </>
                      );
                    })}
                  </Row>
                  {refactoring !== undefined && (
                    <Row
                      id="implementation"
                      className="mt-5 mx-3"
                      style={{ border: "3px dashed", width: "90%" }}
                    >
                      {refactoring !== undefined && (
                        <Refactoring
                          project={project}
                          service={service}
                          sequence={sequence}
                          index={refactoring}
                          showNumber={true}
                          selected={selected2}
                          color={color}
                          step={step}
                          setSelected={setSelected2}
                          setColor={setColor}
                          setStep={setStep}
                        ></Refactoring>
                      )}
                    </Row>
                  )}
                </>
              )}
            </>
          )}
          <Button
            className="mb-3 mt-5 modal-button"
            size="sm"
            onClick={handleShowFinal}
          >
            {" "}
            Check the final state of the component
          </Button>

          <Modal
            size="xl"
            show={showFinal}
            onHide={handleCloseFinal}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {" "}
                Service {service.microservice} final state{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="mt-5"
                style={{ width: "100%" }}
                src={final}
                alt="Final state"
              ></img>
            </Modal.Body>
          </Modal>
        </div>
      </Container>
    </>
  );
}

export default ExtractService;
