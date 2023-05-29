import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";

function FileDependency({
  refactoringItems,
  setRefactoringItems,
  refactoring
}) {
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
    setScrollToElement('implementationStep');
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
    <>
        {refactoring.notes.new_classes !== undefined ||
          refactoring.notes.interfaces !== undefined ? (
          <div className="d-inline my-4">
            <Col className="d-inline me-3">
              <StepButton
                name="Duplicate the file"
                index={0}
                active={refactoringItems.selected}
                hasNext={false}
                handleClick={handleOnClick}
                text={
                  "In this case, as these classes do not handle business logic, it is ok to simply duplicate the " +
                    refactoring.notes.new_classes
                    ? refactoring.notes.new_classes
                    : refactoring.notes.interfaces +
                    " file for each microservice."
                }
              ></StepButton>
            </Col>
          </div>
        ) : (
          <p>
            The file was already added to this microservice in a previous
            refactoring.
          </p>
        )}

        <Row
          id="implementationStep"
          className="d-flex justify-content-center py-3 my-3 mx-5"
          style={{ border: "3px dashed #3C76E1" }}
        >
          {step !== undefined && (
            { step }
          )}
        </Row>
      </>
  );
}

export default FileDependency;
