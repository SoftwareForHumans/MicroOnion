import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import r2 from "../assets/refactoring_2.png";

function ServiceCall({
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
      <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {showNumber ? (index + 1).toString() + ". " : ""}
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
              name="Decide the communication strategy"
              index={0}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={
                "Decide the communication strategy (like HTTP or RPC, for example) and make the initial configurations to use it. Store the necessary information (e.g. URL) to make the remote calls to the microservice. - " +
                refactoring.notes.protocol
              }
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure invoker"
              index={1}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={[
                "Change the method calls to and from local components to be remote calls using this protocol to reach a different service:",
                "\n",
                "1. Create an interface with the declaration of the identified methods - " +
                  refactoring.notes.interfaces +
                  ".",
                "\n",
                "2. Create a class that implements that interface and makes the service calls, a Request Class - " +
                  refactoring.notes.new_classes[0] +
                  ".",
              ]}
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure method owner"
              index={2}
              active={selected}
              hasNext={refactoring.refactorings}
              handleClick={handleOnClick}
              text={[
                "Arrange the microservice owning the method to respond to this communication protocol, creating an API to respond to the service calls.",
                "\n",
                "1. Create a class that defines the resource paths for the requests and processes them producing a response - " +
                  refactoring.notes.new_classes[1] +
                  ".",
                "\n",
                "2. Add methods to the class to perform the actions required by the service calls.",
              ]}
            ></StepButton>
          </Col>
          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              index = index + 2;
              return (
                <>
                  <Col className="d-inline">
                    <RefactoringButton
                      item={item}
                      active={selected === index}
                      handleClick={handleRefactorigClick}
                      sequence={refactoring.refactorings}
                      index={index}
                      color="#1E488F"
                      showNumber={false}
                    ></RefactoringButton>
                  </Col>
                </>
              );
            })}
        </div>
        {step !== undefined && (
          <Row
            id="implementation"
            className="d-flex justify-content-center py-3 my-3 mx-5 px-2"
            style={{ border: "3px dashed " + color, "white-space": "pre-line" }}
          >
            {step}
          </Row>
        )}

        <p style={{ fontSize: "0.8rem" }}>
          Note: By default, we apply this refactoring implementing a synchronous
          call, however if you don't need an instant response or don't want a
          service to wait for the response, it can be asynchronous. Check the
          catalog to find out how to implement an asynchronous call. each
          microservice has its own database - show this
        </p>
      </div>
    </>
  );
}

export default ServiceCall;
