import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";

function MoveForeignKey({
  project,
  service,
  index,
  refactoring,
  showNumber,
  selected,
  color,
  step,
  setSelected,
  setColor,
  setStep,
  image
}) {
  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
    setColor("#687f8c");
  };

  const handleRefactorigClick = (index) => {
    setSelected(index);
    setStep(
      <Refactoring
        project={project}
        service={service}
        sequence={refactoring.refactorings}
        index={index - 2}
      ></Refactoring>
    );
    setColor("#1E488F");
  };
  return (
    <>
      <p className="py-2 blue-text" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
        {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
        Of {refactoring.notes.relationship} between{" "}
        {refactoring.notes.entities[0]} and {refactoring.notes.entities[1]}{" "}
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
              name="Remove Constraint"
              index={0}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text="Remove the foreign-key constraint from the table that stores it and all anotations on the code regarding it."
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Create an Instance variable representation"
              index={1}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={
                "In the class of entity (database table) that used to have the foreign-key constraint, create an instance variable that represents the other entity involved in the said relationship, " +
                refactoring.notes.entities[1] +
                ". Create a column for that variable in this entity table. This variable will no longer be a foreign key but a filter of the select query to retrieve data."
              }
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Separate the tables"
              index={2}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text="Separate the tables into the databases of the different owners (at this moment, this might be more conceptual, but in the future, this will represent the databases of the different microservices)."
            ></StepButton>
          </Col>
          {refactoring.notes.interfaces.length === 2 ? (
            <Col className="d-inline me-3">
              <StepButton
                name="Create an Interface for each database"
                index={3}
                active={selected}
                hasNext={true}
                handleClick={handleOnClick}
                text={
                  "Create an interface for each of these databases that implements the methods of data manipulation: " +
                  refactoring.notes.interfaces[0] +
                  ", " +
                  refactoring.notes.interfaces[1]
                }
              ></StepButton>
            </Col>
          ) : (
            <></>
          )}
          {refactoring.notes.interfaces.length === 1 ? (
            <Col className="d-inline me-3">
              <StepButton
                name="Create an Interface for each database"
                index={3}
                active={selected}
                hasNext={true}
                handleClick={handleOnClick}
                text={
                  "Create an interface for each of these databases that implements the methods of data manipulation: " +
                  refactoring.notes.interfaces[0] +
                  ". You don't need to create the other interface again because it had been created at a previous refactoring."
                }
              ></StepButton>
            </Col>
          ) : (
            <></>
          )}

          <Col className="d-inline me-3">
            <StepButton
              name="Make necessary changes"
              index={4}
              active={selected}
              hasNext={refactoring.refactorings}
              handleClick={handleOnClick}
              text="Identify the methods that use/manipulate data from different databases and change them to use the newly created interfaces."
            ></StepButton>
          </Col>
          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              index = index + 5;
              return (
                <>
                  <Col className="d-inline">
                    <RefactoringButton
                      item={item}
                      active={selected === index}
                      handleClick={handleRefactorigClick}
                      sequence={refactoring.refactorings}
                      index={index}
                      showNumber={false}
                      color="#1E488F"
                      selected={selected}
                      step={step}
                      setSelected={setSelected}
                      setColor={setColor}
                      setStep={setStep}
                    ></RefactoringButton>
                  </Col>
                </>
              );
            })}
        </div>
        {refactoring.notes.interfaces.length === 0 ? (
          <p>
            You don't need to create either interface that implements the
            methods of data manipulation again because it was already built
            during a previous refactoring.
          </p>
        ) : (
          <></>
        )}
        {step !== undefined && (
          <Row
            id="implementation"
            className="d-flex justify-content-center pt-3 pb-1 my-3 mx-5"
            style={{ border: "3px dashed " + color }}
          >
            <p>{step}</p>
          </Row>
        )}

        <p className="mt-5" style={{ fontSize: "0.8rem" }}>
          Note: Although not mentioned here, data replication is always an
          option to solve a database dependency. If you think it is more
          suitable for your system, check the catalog to find out how to
          implement it.
        </p>
      </div>
    </>
  );
}

export default MoveForeignKey;
