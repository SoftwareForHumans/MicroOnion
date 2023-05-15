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
import Col from "react-bootstrap/Col";
import SquaredButton from "../components/SquaredButton";
function ServiceCall(props) {
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

export default ServiceCall;
