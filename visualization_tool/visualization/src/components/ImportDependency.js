//  print("We identified a dependency in the file " + file +  " with the file " + dependent_file + " in the imports. However, we aren't able to fix it")
import Col from "react-bootstrap/Col";
import SquaredButton from "../components/SquaredButton";
function ImportDependency(props) {
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
}

export default ImportDependency;
