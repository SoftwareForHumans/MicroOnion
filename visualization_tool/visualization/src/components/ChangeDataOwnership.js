import Col from "react-bootstrap/Col";
import SquaredButton from "../components/SquaredButton";
function ChangeDataOwnership(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const refactoring = props.refactoring;
  return (
    <>
      <h6 className="py-2">{(index + 1).toString() + ". " + refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}</h6>
      {refactoring.refactorings &&
        refactoring.refactorings.map((item, index) => {
          return (
            <>
              <Col className="d-inline">
                <SquaredButton
                  item={item}
                  // handleClick={setRefactoring}
                  sequence={refactoring.refactorings}
                  index={index}
                  color="#1E488F"
                ></SquaredButton>
              </Col>
            </>
          );
        })}
    </>
  );

  //this service becomes the owener of the data/table/entity
}

export default ChangeDataOwnership;
