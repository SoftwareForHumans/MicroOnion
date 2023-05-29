import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";

function FileDependency({
  project,
  service,
  refactoringItems,
  setRefactoringItems,
  refactoring,
  refactoringItems2,
  setRefactoringItems2,
  showNumber,
}) {
  const [step, setStep] = useState(undefined);
  const handleOnClick = (index, text) => {
    setStep(text);
    setRefactoringItems((prev) => ({
      ...prev,
      selected: index,
      color: "#1E488F",
    }));
  };

  return (
    <Row className="mt-2 blue-text">
      <p style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (refactoringItems.index + 1).toString() + ". " : ""}
        {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
        Of{" "}
        {refactoring.notes.new_classes
          ? refactoring.notes.new_classes
          : refactoring.notes.interfaces}
      </p>
      <div className="intermediate-text">
        <p className="d-flex align-self-start ms-5">
          Refactoring schematical representation:
        </p>
        <img
          className="pb-3"
          style={{maxHeight:"25rem", maxWidth:"100%", alignSelf: "center" }}
          src={`data:image/png;base64,${refactoringItems.image}`}
          alt="refactoring change schema"
        ></img>
        <p>
          To apply this refactoring, follow the below sequence of steps (
          <b>click on each of them to find out how to implement them</b>):
        </p>
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
                  "In this case, as this classes do not handle business logic, it is ok to simply duplicate the " +
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

        {step !== undefined && (
          <Row
            id="implementation"
            className="d-flex justify-content-center py-3 my-3 mx-5"
            style={{ border: "3px dashed #3C76E1" }}
          >
            {step}
          </Row>
        )}
      </div>
    </Row>
  );
}

export default FileDependency;
