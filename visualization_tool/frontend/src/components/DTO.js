import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";

function DTO({
  refactoringItems,
  setRefactoringItems,
  refactoring,
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
        window.scrollTo(
          element.offsetLeft,
          element.offsetTop - header.offsetHeight
        );
        setScrollToElement("");
      }
    }
  };

  const handleOnClick = (index, text) => {
    setStep(text);
    setScrollToElement("implementationSecondStep");
    setRefactoringItems((prev) => ({
      ...prev,
      selected: index,
      color: "#687f8c",
    }));
  };

  useEffect(() => {
    scrollToElement(scrollToElementId);
  }, [scrollToElementId]);

  return (
    <>
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
      <Row id="implementationSecondStep" className="mx-5">
        {step !== undefined && (
          <div
            className="d-flex justify-content-center py-3 my-3"
            style={{ border: "3px dashed " + refactoringItems.color }}
          >
            {step}
          </div>
        )}
      </Row>
    </>
  );
}

export default DTO;
