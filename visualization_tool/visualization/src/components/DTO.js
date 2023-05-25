import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import StepButton from "./StepButton";

function DTO({
  project,
  service,
  index,
  refactoring,
  showNumber,
  selected,
  step,
  setSelected,
  setStep,
  image
}) {
  const text =
    "Create an entity (Data Transfer Object), " +
    refactoring.notes.created +
    ", to hold the data necessary in a call between those services. It must be serializable to be sent through the connection.";

  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
  };

  return (
    <>
      <p className="mt-2 blue-text" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
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
          src={`data:image/png;base64,${image}`}
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
              active={selected}
              hasNext={false}
              handleClick={handleOnClick}
              text={text}
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

export default DTO;
