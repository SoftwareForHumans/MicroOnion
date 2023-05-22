import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";
import r2 from "../assets/refactoring_2.png";

function FileDependency(props) {
  const index = props.index;
  const refactoring = props.refactoring;
  const showNumber = props.showNumber;
  const [selected, setSelected] = useState();
  const [step, setStep] = useState();

  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
  };

  return (
    <>
      <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
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
          style={{ width: "90%", alignSelf: "center" }}
          src={r2}
          alt="refactoring change schema"
        ></img>
        <p>
          To apply this refactoring, follow the below sequence of steps (
          <b>click on each of them to find out how to implement them</b>):
        </p>
        <div className="d-inline my-4">
          <Col className="d-inline me-3">
            <StepButton
              name="Duplicate the file"
              index={0}
              active={selected}
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
    </>
  );
}

export default FileDependency;
