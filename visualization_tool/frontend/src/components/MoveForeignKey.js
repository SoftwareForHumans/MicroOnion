import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import axios from "axios";

function MoveForeignKey({
  project,
  service,
  refactoringItems,
  setRefactoringItems,
  refactoring,
  refactoringItems2,
  setRefactoringItems2,
}) {
  const [loadStep, setLoadStep] = useState(undefined);
  const [step, setStep] = useState(undefined);
  const [scrollToElementId, setScrollToElement] = useState();

  const scrollToElement = (id) => {
    let element = document.getElementById(id);
    let header = document.getElementById("header");
    if (element) {
      setTimeout(scroll, 500);
      function scroll() {
        window.scrollTo(
          element.offsetLeft,
          element.offsetTop - header.offsetHeight
        );
        setScrollToElement("");
      }
    }
  };

  const handleOnClick = (index, text) => {
    setLoadStep(true);
    setStep(text);
    setScrollToElement("implementationStep");
    setRefactoringItems((prev) => ({
      ...prev,
      selected: index,
      color: "#687f8c",
    }));
    setLoadStep(false);
  };

  const handleRefactoringClick = (index) => {
    setStep(undefined);
    setLoadStep(true);
    let id = refactoring.refactorings[index].id;
    try {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}projects/${project}/getRefactoringImage/${service.microservice}/${id}`,
          {
            headers: {
              "Content-Type": "image/png",
            },
          }
        )
        .then((res) => {
          setRefactoringItems2((prev) => ({
            ...prev,
            selected: undefined,
            step: undefined,
            color: undefined,
            index: index,
            sequence: refactoring.refactorings,
            image: res.data,
          }));

          let idx = index + (refactoring.notes.interfaces ? 5 : 4);

          setRefactoringItems((prev) => ({
            ...prev,
            selected: idx,
            color: "#1E488F",
          }));
          setLoadStep(false);
          setScrollToElement("implementationStep");
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollToElement(scrollToElementId);
  }, [scrollToElementId]);

  return (
    <>
      <div className="d-inline my-4">
        <Col className="d-inline me-3">
          <StepButton
            name="Remove Constraint"
            index={0}
            active={refactoringItems.selected}
            hasNext={true}
            handleClick={handleOnClick}
            text="Remove the foreign-key constraint from the table that stores it and all anotations on the code regarding it."
          ></StepButton>
        </Col>
        <Col className="d-inline me-3">
          <StepButton
            name="Create an Instance variable representation"
            index={1}
            active={refactoringItems.selected}
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
            active={refactoringItems.selected}
            hasNext={true}
            handleClick={handleOnClick}
            text="Separate the tables into the databases of the different owners (at this moment, this might be more conceptual, but in the future, this will represent the databases of the different microservices)."
          ></StepButton>
        </Col>
        {refactoring.notes.interfaces !== undefined && refactoring.notes.interfaces.length === 2 ? (
          <Col className="d-inline me-3">
            <StepButton
              name="Create an Interface for each database"
              index={3}
              active={refactoringItems.selected}
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
        {refactoring.notes.interfaces !== undefined &&  refactoring.notes.interfaces.length === 1 ? (
          <Col className="d-inline me-3">
            <StepButton
              name="Create an Interface for each database"
              index={3}
              active={refactoringItems.selected}
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
            index={refactoring.notes.interfaces ? 4 : 3}
            active={refactoringItems.selected}
            hasNext={refactoring.refactorings}
            handleClick={handleOnClick}
            text="Identify the methods that use/manipulate data from different databases and change them to use the newly created interfaces."
          ></StepButton>
        </Col>
        {refactoring.refactorings &&
          refactoring.refactorings.map((item, index) => {
            index = index + (refactoring.notes.interfaces ? 5 : 4);
            return (
              <>
                <Col className="d-inline" key={index}>
                  <RefactoringButton
                    item={item}
                    active={refactoringItems.selected === index}
                    handleClick={handleRefactoringClick}
                    sequence={refactoring.refactorings}
                    index={index}
                    showNumber={false}
                    color="#1E488F"
                    selected={refactoringItems.selected}
                    step={refactoringItems.step}
                    setSelected={refactoringItems.setSelected}
                    setColor={refactoringItems.setColor}
                    setStep={refactoringItems.setStep}
                  ></RefactoringButton>
                </Col>
              </>
            );
          })}
      </div>
      {refactoring.notes.interfaces !== undefined &&  refactoring.notes.interfaces.length === 0 ? (
        <p>
          You don't need to create either interface that implements the methods
          of data manipulation again because it was already built during a
          previous refactoring.
        </p>
      ) : (
        <></>
      )}

      <Row id="implementation" className="mx-5">
        {loadStep !== undefined && (
          <>
            {loadStep === true ? (
              <></>
            ) : (
              <>
                <div
                  className="d-flex justify-content-center py-3 my-3 px-2"
                  style={{ border: "3px dashed " + refactoringItems.color }}
                >
                  {step !== undefined ? (
                    <>{step}</>
                  ) : (
                    <Refactoring
                      project={project}
                      service={service}
                      refactoringItems={refactoringItems2}
                      setRefactoringItems={setRefactoringItems2}
                      refactoringItems2={{}}
                      setRefactoringItems2={() => {}}
                      showNumber={false}
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}
      </Row>

      <p className="mt-3" style={{ fontSize: "0.8rem" }}>
        Note: Although not mentioned here, data replication is always an option
        to solve a database dependency. If you think it is more suitable for
        your system, check the{" "}
        <a
          style={{ color: "#092256" }}
          href="https://drive.google.com/file/d/1giOX96fcBT8IA82PBAeU_RDuEV4inyxX/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          catalogue
        </a>{" "}
        to find out how to implement it. Additionally, you may need to remove
        code annotations when using specific programming languages, frameworks
        or ORMs that use it.
      </p>
    </>
  );
}

export default MoveForeignKey;
