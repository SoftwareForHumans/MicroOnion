import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import r2 from "../assets/refactoring_2.png";

function ServiceCall(props) {
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
    setSelected(index);
    setStep(<Refactoring project={project}
      service={service}
      sequence={refactoring.refactorings}
      index={index-2}></Refactoring>)

  }

  return (
    <>
    <p className="mt-2" style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
        {(index + 1).toString() +
          ". " +
          refactoring.name[0] +
          refactoring.name.slice(1).toLowerCase()}
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
              text="Decide the communication strategy (like HTTP or RPC, for example) and make the initial configurations to use it. Store the necessary information (e.g. URL) to make the remote calls to the microservice."
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure invoker"
              index={1}
              active={selected}
              hasNext={true}
              handleClick={handleOnClick}
              text={["Change the method calls to and from local components to be remote calls using this protocol to reach a different service:", "\n", "1. Create an interface with the declaration of the identified methods","\n", "2. Create a class that implements that interface and makes the service calls, a Request Class"]}
            ></StepButton>
          </Col>
          <Col className="d-inline me-3">
            <StepButton
              name="Configure method owner"
              index={2}
              active={selected}
              hasNext={refactoring.refactorings}
              handleClick={handleOnClick}
              text={["Arrange the microservice owning the method to respond to this communication protocol, creating an API to respond to the service calls.", "\n", "1. Create a class that defines the resource paths for the requests and processes them producing a response", "\n", "2. Add methods to the class to perform the actions required by the service calls"]}
            ></StepButton>
          </Col>
          {refactoring.refactorings &&
            refactoring.refactorings.map((item, index) => {
              index = index + 2
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
            style={{ border: "3px dashed #687f8c", "white-space": "pre-line" }}
          >
            {step}
          </Row>
        )}

        <p style={{ fontSize: "0.8rem" }}>
          Note: By default, we apply this refactoring implementing a synchronous call, however if you don't need
        an instant response or don't want a service to wait for the response, it can be asynchronous. Check the catalog to find out how to implement an asynchronous call. 
        each microservice has its own database - show this
        </p>
      </div>
      
    </>
  );
}

export default ServiceCall;

//pode escolher entre sincrono ou assincrono
// decide the protocol
// change the calls
// create an interface
// create a class that implements that interface
// create a variabke of the interface type
// store necessary microservice information
// change the other microservice to receive the requestz
// create a class that defines the resource paths
// create a class to process the requestz requests# add methods to entity to perform the actions

// # microservice - criar uma interface e uma classe request que a implementa
// # microservice - criar service call com o metodo, protocolo e tipo
// # dependent microservice - criar uma classe para dat handle dos requests, recebendo, processando e retornando uma respsota

//decide between syncrhonous or asynchrnous