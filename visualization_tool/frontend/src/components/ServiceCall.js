import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import axios from "axios";

function ServiceCall({
  project,
  service,
  refactoringItems,
  setRefactoringItems,
  refactoring,
  refactoringItems2,
  setRefactoringItems2,
  showNumber,
}) {
  const [loadStep, setLoadStep] = useState(undefined);
  const [step, setStep] = useState(undefined);
  const [scrollToElementId, setScrollToElement] = useState();
  const scrollToElement = (id) => {
    let element = document.getElementById(id);
    let header = document.getElementById("header");
    if (element) {
      setTimeout(scroll, 500);
      function scroll() {
        window.scrollTo(
          element.offsetLeft,
          element.offsetTop - header.offsetHeight
        );
        setScrollToElement("");
      }
    }
  };

  const handleOnClick = (index, text) => {
    setLoadStep(true);
    setStep(text);

    setRefactoringItems((prev) => ({
      ...prev,
      selected: index,
      color: "#687f8c",
    }));
    setLoadStep(false);
    setScrollToElement("implementationStep");
  };

  const handleRefactorigClick = (index) => {
    setLoadStep(true);
    setStep(undefined);
    let id = refactoring.refactorings[index].id;
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
          setRefactoringItems2((prev) => ({
            ...prev,
            selected: undefined,
            step: undefined,
            color: undefined,
            index: index,
            sequence: refactoring.refactorings,
            image: res.data,
          }));

          setScrollToElement("implementationStep");

          let idx = index + 3;

          setRefactoringItems((prev) => ({
            ...prev,
            selected: idx,
            color: "#1E488F",
          }));

          setLoadStep(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollToElement(scrollToElementId);
  }, [scrollToElementId]);

  return (
    <Row className="mt-2 blue-text">
      <p style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (refactoringItems.index + 1).toString() + ". " : ""}
        {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
        Of method {refactoring.notes.method} from {refactoring.notes.target}
      </p>
      <div className="intermediate-text">
        <p className="d-flex align-self-start ms-5">
          Refactoring schematical representation:
        </p>
        <img
          className="pb-3"
          style={{ maxHeight: "25rem", maxWidth: "100%", alignSelf: "center" }}
          src={`data:image/png;base64,${refactoringItems.image}`}
          alt="refactoring change schema"
        ></img>
        <p>
          To apply this refactoring, follow the below sequence of steps (
          <b>click on each of them to find out how to implement them</b>):
        </p>
        <div className="d-inline my-4">
          <Col className="d-inline me-3">
            <StepButton
              name="Decide the communication strategy"
              index={0}
              active={refactoringItems.selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={
                "Decide the communication strategy (like REST or RPC, for example) and make the initial configurations to use it. Store the necessary information (e.g. URL) to make the remote calls to the microservice. - " +
                refactoring.notes.protocol
              }
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure invoker"
              index={1}
              active={refactoringItems.selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={[
                "Change the method calls to and from local components to be remote calls using this communication strategy to reach a different service:",
                "\n",
                "1. Create an interface with the declaration of the identified methods - " +
                  (refactoring.notes.interfaces !== undefined
                    ? refactoring.notes.interfaces
                    : "the interface was already created in a previous refactoring") +
                  ".",
                "\n",
                "2. Create a class that implements that interface and makes the service calls, a Request Class - " +
                  (refactoring.notes.new_classes[0] !== undefined
                    ? refactoring.notes.new_classes[0]
                    : "the request class was already created in a previous refactoring") +
                  ".",
              ]}
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure method owner"
              index={2}
              active={refactoringItems.selected}
              hasNext={refactoring.refactorings}
              handleClick={handleOnClick}
              text={[
                "Arrange the microservice owning the method to respond to this communication strategy, creating an API to respond to the service calls.",
                "\n",
                "1. Create a class that defines the resource paths for the requests and processes them producing a response - " +
                  (refactoring.notes.new_classes[1] !== undefined
                    ? refactoring.notes.new_classes[1]
                    : "the request handler class was already created in a previous refactoring") +
                  ".",
                "\n",
                "2. Add methods to the class to perform the actions required by the service calls.",
              ]}
            ></StepButton>
          </Col>
          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              index = index + 3;
              return (
                <>
                  <Col className="d-inline" key={index}>
                    <RefactoringButton
                      item={item}
                      active={refactoringItems.selected === index}
                      handleClick={handleRefactorigClick}
                      sequence={refactoring.refactorings}
                      index={index}
                      color="#1E488F"
                      showNumber={false}
                      selected={refactoringItems.selected}
                      step={refactoringItems.step}
                      setSelected={refactoringItems.setSelected}
                      setColor={refactoringItems.setColor}
                      setStep={refactoringItems.setStep}
                    ></RefactoringButton>
                  </Col>
                </>
              );
            })}
        </div>

        <Row id="implementationStep" className="mx-5">
          {loadStep !== undefined && (
            <>
              {loadStep === true ? (
                <></>
              ) : (
                <>
                  <div
                    className="d-flex justify-content-center py-3 my-3 px-2"
                    style={{ border: "3px dashed " + refactoringItems.color }}
                  >
                    {step !== undefined ? (
                      <>{step}</>
                    ) : (
                      <Refactoring
                        project={project}
                        service={service}
                        refactoringItems={refactoringItems2}
                        setRefactoringItems={setRefactoringItems2}
                        refactoringItems2={{}}
                        setRefactoringItems2={() => {}}
                        showNumber={false}
                      />
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </Row>

        <p className="mt-3" style={{ fontSize: "0.8rem" }}>
          Note: By default, we apply this refactoring implementing a synchronous
          call, however if you don't need an instant response or don't want a
          service to wait for the response, it can be asynchronous. Check the
          catalogue to find out how to implement an asynchronous call.
        </p>
      </div>
    </Row>
  );
}

export default ServiceCall;
