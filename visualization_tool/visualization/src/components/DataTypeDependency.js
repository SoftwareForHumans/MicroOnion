import { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import RefactoringButton from "../components/RefactoringButton";
import r2 from "../assets/refactoring_2.png";

function DataTypeDependency(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const refactoring = props.refactoring;
  const [hasMethod, setHasMethod] = useState(false);
  const [hasDTO, setHasDTO] = useState(false);

  function checkSubRefactorings() {
    refactoring.refactorings.forEach((r) => {
      if (r.name === "CREATE DATA TRANSFER OBJECT") setHasDTO(true);
      if (r.name === "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL")
        setHasMethod(true);
    });
  }

  useEffect(() => {
    checkSubRefactorings();
  });

  return (
    <>
      <h6 className="py-3">
        {(index + 1).toString() +
          ". " +
          refactoring.name[0] +
          refactoring.name.slice(1).toLowerCase()}{" "}
      </h6>
      <p style={{ fontWeight: "bold", fontSize: "0.75rem" }}>
        Of {refactoring.notes.file} with{" "}
        {refactoring.notes.dependent_file.split(".").slice(-1)}
      </p>
      <div className="d-flex flex-column justify-content-center pb-4">
      <img className="pb-3" style={{width:"90%", alignSelf:"center"}} src={r2} alt="refactoring change schema"></img>
        
      <p>
        To apply this refactoring, follow the below sequence of steps (<b>click on
        each of them to find out how to implement them</b>):
      </p>

        {/* <ol type="1">
          {hasMethod && (
            <li>
              Change the method invocation from local calls to service calls to
              the service that owns the data type and its methods, using{" "}
              <b>Change Local Method Call to Service Call</b>
            </li>
          )}
          {hasDTO && (
            <li>
              Create a Data Transfer Object to create the data type in the
              microservice
            </li>
          )}

          <li>
            Create an interface with the same name as the data type that defines
            the methods invocations identified to be used through the data
            transfer object to make service calls to the data owner (if needed)
          </li>
        </ol>

        
        
        <p>
          You have the following sequence of refactorings to implement in this
          case (<b>click on each of them to find out how to implement them</b>)
        </p>
        */}
        <div className="d-inline">
        {refactoring.refactorings &&
          refactoring.refactorings.map((item, index) => {
            return (
              <>
                <Col className="d-inline me-3">
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
          </div> 
          <p style={{fontSize:"0.8rem"}}>
          Note: By default we assume the data type is owned and exist only on the
          microservice where it was first defined. However, there are two other
          options that can be used keeping it in both microservices: to use one
          as a proxy or to do replication
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
