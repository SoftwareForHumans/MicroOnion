import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";

function DataTypeDependency({
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
  image,
}) {
  const indexLast =
    1 + (refactoring.refactorings ? refactoring.refactorings.length + 1 : 0);

  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
    setColor("#687f8c");
  };

  const handleRefactorigClick = (index) => {
    setSelected(index + 2);
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

  function hasDTO(arr) {
    for (let i in arr) {
      if (arr[i].name === "CREATE DATA TRANSFER OBJECT") {
        return true;
      }
    }
    return false;
  }

  return (
    <>
      <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
        {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
        Of {refactoring.notes.file} with{" "}
        {refactoring.notes.dependent_file.split(".").slice(-1)}
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
              name="Identify where the data type is used"
              index={0}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={
                "For example, the method invocations from the data type class, variable, parameters or return types of the data type. In this case, the dependencies are: " +
                refactoring.notes.dependencies
              }
            ></StepButton>
          </Col>
          {refactoring.notes.interfaces ? (
            <Col className="d-inline me-3">
              <StepButton
                name="Create an interface"
                index={1}
                active={selected}
                hasNext={refactoring.refactorings}
                handleClick={handleOnClick}
                text={
                  "Create an interface with the same name as the data type, " +
                  refactoring.notes.interfaces +
                  ", that defines the methods invocations identified to be used through the data transfer object to make service calls to the data owner."
                }
              ></StepButton>
            </Col>
          ) : (
            <></>
          )}

          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              const seq = refactoring.refactorings + {};
              return (
                <>
                  <RefactoringButton
                    item={item}
                    active={selected === index + 2}
                    handleClick={handleRefactorigClick}
                    sequence={seq}
                    index={index}
                    color="#1E488F"
                    showNumber={false}
                    selected={selected}
                    step={step}
                    setSelected={setSelected}
                    setColor={setColor}
                    setStep={setStep}
                  ></RefactoringButton>
                </>
              );
            })}
          <Col className="d-inline me-3">
            <StepButton
              name="Make the necessary changes"
              index={indexLast}
              active={selected}
              hasNext={false}
              handleClick={handleOnClick}
              text="Make the necessary changes in the code to use the new data type and the right interface for the method calls."
            ></StepButton>
          </Col>
          {hasDTO(refactoring.refactorings) ? (
            <></>
          ) : (
            <p>
              An earlier refactoring created the data transfer object. Use the
              DTO that has already been created.
            </p>
          )}
          {refactoring.notes.dependencies.includes("methodInvocation") &&
          refactoring.notes.interfaces === undefined ? (
            <p>
              In a prior refactoring, the interface for the definition of the
              DTO's method invocations was already created. Use the interface
              that has already been created.
            </p>
          ) : (
            <></>
          )}
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

        <p className="mt-5" style={{ fontSize: "0.8rem" }}>
          Note: By default we assume the data type is owned and exist only on
          the microservice where it was first defined. However, there are two
          other options that can be used keeping it in both microservices: to
          use one as a proxy or to do replication
        </p>
      </div>
    </>
  );
}

export default DataTypeDependency;
