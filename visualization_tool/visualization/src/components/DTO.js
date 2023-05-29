import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";

function DTO({
  project,
  service,
  refactoringItems,
  setRefactoringItems,
  refactoring,
  refactoringItems2,
  setRefactoringItems2,
  showNumber,
}) {
  const text =
    "Create an entity (Data Transfer Object), " +
    refactoring.notes.created +
    ", to hold the data necessary in a call between those services. It must be serializable to be sent through the connection.";
  const [step, setStep] = useState(undefined);
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

  const handleOnClick = (index, text) => {
    setStep(text);
    setScrollToElement('implementationSecondStep');
    setRefactoringItems((prev) => ({
      ...prev,
      selected: index,
      color: "#1E488F",
    }));
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
        {refactoring.notes.created}
      </p>
      <div className="intermediate-text">
        <p className="d-flex align-self-start ms-5">
          Refactoring schematical representation:
        </p>
        <img
          className="pb-3"
          style={{ width: "90%", alignSelf: "center" }}
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
              name="Create an entity (Data Transfer Object)"
              index={0}
              active={refactoringItems.selected}
              hasNext={false}
              handleClick={handleOnClick}
              text={text}
            ></StepButton>
          </Col>
        </div>
        <Row 
          id="implementationSecondStep"
          className="mx-5">
          {step !== undefined && (
            <div 
              className="d-flex justify-content-center py-3 my-3"
              style={{ border: "3px dashed #3C76E1" }}>
              {step}
            </div>
          )}
        </Row>
      </div>
    </Row>
  );
}

export default DTO;
