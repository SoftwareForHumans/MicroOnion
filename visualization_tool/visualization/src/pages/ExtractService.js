import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import Refactoring from "../components/Refactoring";
import RefactoringButton from "../components/RefactoringButton";
import DependenciesTable from "../components/DependenciesTable";
import { Oval } from "react-loading-icons";

function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const index = state.index;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingRefactoring, setLoadingRefactoring] = useState(true);
  const [sequence, setSequence] = useState();
  const [initialState, setInitialState] = useState();
  const [finalState, setFinalState] = useState();
  const [refactoring, setRefactoring] = useState();
  const [selected, setSelected] = useState(null);
  const [show, setShow] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  const [selected2, setSelected2] = useState(undefined);
  const [step, setStep] = useState(undefined);
  const [color, setColor] = useState(undefined);
  const [refactoringImage, setRefactoringImage] = useState(undefined);

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
    let id = sequence[index].id;
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
          setRefactoringImage(res.data);
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
  }, [from, to, sequence, finalState, initialState]);

  return (
    <>
      <Container className="mb-5 d-flex flex-row blue-text">
        <Col
          lg={2}
          className="justify-content-start align-items-start d-flex position-fixed"
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
        </Col>

        {loading ? (
          <Col lg={12} className="mt-5 mb-5 ms-2">
            <Row className="center-all">
              <Oval
                className="center-all"
                stroke="#092256"
                strokeOpacity={1}
                strokeWidth={10}
              />
            </Row>
          </Col>
        ) : (
          <div className="mt-3 mb-5 ms-2 center-all flex-column">
            <Row className="center-all">
              <h4 className="mb-4 center-all">
                Extract service {service.microservice}
              </h4>
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
                    src={`data:image/png;base64,${initialState}`}
                    alt="Initial state"
                  ></img>
                </Modal.Body>
              </Modal>
              <p style={{ fontSize: "0.95rem" }}>
                To extract the service, identify the dependencies of the service
                to the monolith and of the monolith to the service:
              </p>
            </Row>

            <Row className="center-all flex-column">
              <Row className="mt-3 mb-2">
                <h6>Service dependencies to the Monolith</h6>
              </Row>
              {from === undefined || from.length === 0 ? (
                <>
                  <p>
                    There are no dependencies of this component to the Monolith
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
                    There are no dependencies of this component to the Monolith
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
                      <>
                        {loadingRefactoring ? (
                          <Oval
                            className="center-all"
                            stroke="#092256"
                            strokeOpacity={1}
                            strokeWidth={10}
                          />
                        ) : (
                          <Refactoring
                            project={project}
                            service={service}
                            sequence={sequence}
                            index={refactoring}
                            image={refactoringImage}
                            showNumber={true}
                            selected={selected2}
                            color={color}
                            step={step}
                            setSelected={setSelected2}
                            setColor={setColor}
                            setStep={setStep}
                          ></Refactoring>
                        )}
                      </>
                    )}
                  </Row>
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
                  src={`data:image/png;base64,${finalState}`}
                  alt="Final state"
                ></img>
              </Modal.Body>
            </Modal>
          </div>
        )}
      </Container>
    </>
  );
}

export default ExtractService;
