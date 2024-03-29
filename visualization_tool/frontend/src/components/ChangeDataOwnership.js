import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import RefactoringButton from "../components/RefactoringButton";
import Refactoring from "../components/Refactoring";
import StepButton from "./StepButton";
import axios from "axios";

function ChangeDataOwnership({
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

          let idx = index + 1;

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
            name="Change Owner"
            index={0}
            active={refactoringItems.selected}
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
                  key={index}
                  item={item}
                  active={refactoringItems.selected === index + 1}
                  handleClick={handleRefactoringClick}
                  sequence={refactoring.refactorings}
                  index={index}
                  color="#1E488F"
                  showNumber={false}
                ></RefactoringButton>
              </>
            );
          })}
      </div>
      <Row id="implementationStep" className="mx-5">
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
        Note: In this case we only portray the case of not needing to break a
        database table. You can find the other cases in the{" "}
        <a
          style={{ color: "#092256" }}
          href="https://drive.google.com/file/d/1giOX96fcBT8IA82PBAeU_RDuEV4inyxX/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          catalogue
        </a>{" "}
        , like splitting a table, replication, etc. .
      </p>
    </>
  );
}

export default ChangeDataOwnership;
