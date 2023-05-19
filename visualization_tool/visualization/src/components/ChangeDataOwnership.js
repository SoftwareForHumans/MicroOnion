import Col from "react-bootstrap/Col";
import RefactoringButton from "../components/RefactoringButton";
import r2 from "../assets/refactoring_2.png";

function ChangeDataOwnership(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const refactoring = props.refactoring;

  return (
    <>
      <h6 className="py-2">
        {(index + 1).toString() +
          ". " +
          refactoring.name[0] +
          refactoring.name.slice(1).toLowerCase()}
      </h6>
      <p>
        When extracting a new service that encapsulates the business logic of
        some data, that data should belong to that service and, therefore,
        should be moved into the new service.
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
      {refactoring.refactorings &&
        refactoring.refactorings.map((item, index) => {
          return (
            <>
              <Col className="d-inline">
                <RefactoringButton
                  item={item}
                  // handleClick={setRefactoring}
                  sequence={refactoring.refactorings}
                  index={index}
                  color="#1E488F"
                ></RefactoringButton>
              </Col>
            </>
          );
        })}
      <p style={{ fontSize: "0.8rem" }}>
        Note: In this case we only portray the case of not needing to break a
        database table. You can find the other cases in the catalog
      </p>
    </>
  );

  //this service becomes the owener of the data/table/entity
}

export default ChangeDataOwnership;
