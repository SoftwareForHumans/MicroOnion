import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import r2 from "../assets/refactoring_2.png";

function DataTypeDependency(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const refactoring = props.refactoring;
  const [selected, setSelected] = useState();
  const [step, setStep] = useState();
  
  const handleOnClick = (index, text) => {
    setSelected(index);
    setStep(text);
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
  };

  return (
    <>
      <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {(index + 1).toString() +
          ". " +
          refactoring.name[0] +
          refactoring.name.slice(1).toLowerCase()}
      </p>
      <p style={{ fontWeight: "bold", fontSize: "0.75rem" }}>
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
              name="Identify where the data type is used"
              index={0}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text="For example, the method invocations from the data type class, variable, parameters or return types of the data type."
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Create an interface"
              index={1}
              active={selected}
              hasNext={refactoring.refactorings}
              handleClick={handleOnClick}
              text="Create an interface with the same name as the data type that defines the methods invocations identified to be used through the data transfer object to make service calls to the data owner."
            ></StepButton>
          </Col>
          {refactoring.refactorings && 
            refactoring.refactorings.map(( item, index) => {
              return (
                <> 
                  <RefactoringButton
                    item={item}
                    active={selected === index + 2}
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
            style={{ border: "3px dashed #687f8c" }}
          >
            {step}
          </Row>
        )} 

        <p style={{ fontSize: "0.8rem" }}>
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
// # idenitfy where it is used
// # change local method call to service call
// #data transfer object
// # create an interface with the same as the data type that defines the methods invocations identified
