import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import r2 from "../assets/refactoring_2.png";

function ChangeDataOwnership({
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
}) {
  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
    setColor("#687f8c");
  };

  const handleRefactorigClick = (index) => {
    setSelected(index + 1);
    setStep(
      <Refactoring
        project={project}
        service={service}
        sequence={refactoring.refactorings}
        index={index}
      ></Refactoring>
    );
    setColor("#1E488F");
  };

  return (
    <>
      <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
        {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
        Of {refactoring.notes.entity} to Service {service.microservice}
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
              name="Change Owner"
              index={0}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text="When extracting a new service that encapsulates the business logic of
              some data, that data should belong to that service and, therefore,
              should be moved into the new service. This service will then become
              the owner of the data/table/entity."
            ></StepButton>
          </Col>
          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              return (
                <>
                  <RefactoringButton
                    item={item}
                    active={selected === index + 1}
                    handleClick={handleRefactorigClick}
                    sequence={refactoring.refactorings}
                    index={index}
                    color="#1E488F"
                    showNumber={false}
                  ></RefactoringButton>
                </>
              );
            })}
        </div>
        {step !== undefined && (
          <Row
            id="implementation"
            className="d-flex justify-content-center py-3 my-3 mx-5 px-2"
            style={{ border: "3px dashed " + color }}
          >
            {step}
          </Row>
        )}

        <p style={{ fontSize: "0.8rem" }}>
          Note: In this case we only portray the case of not needing to break a
          database table. You can find the other cases in the catalog, like
          splitting a table, replication, etc. .
        </p>
      </div>
    </>
  );
}

export default ChangeDataOwnership;
