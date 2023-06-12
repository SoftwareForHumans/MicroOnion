import Row from "react-bootstrap/Row";
import DataTypeDependency from "../components/DataTypeDependency";
import ChangeDataOwnership from "../components/ChangeDataOwnership";
import ServiceCall from "../components/ServiceCall";
import MoveForeignKey from "../components/MoveForeignKey";
import DTO from "../components/DTO";
import FileDependency from "../components/FileDependency";

function Refactoring({
  project,
  service,
  refactoringItems,
  setRefactoringItems,
  refactoringItems2,
  setRefactoringItems2,
  showNumber,
}) {
  const refactoring = refactoringItems.sequence[refactoringItems.index];
  showNumber = showNumber !== undefined ? showNumber : false;

  return (
    <>
      <Row className="mt-2 blue-text">
        <p style={{ fontSize: "1.15rem", fontWeight: "bold" }}>
          {showNumber ? (refactoringItems.index + 1).toString() + ". " : ""}
          {refactoring.name[0] + refactoring.name.slice(1).toLowerCase()}
        </p>
        <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
          {refactoring.name === "BREAK DATA TYPE DEPENDENCY" && (
            <>
              Of {refactoring.notes.file} with{" "}
              {refactoring.notes.dependent_file.split(".").slice(-1)}
            </>
          )}
          {refactoring.name ===
            "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL" && (
            <>
              Of method {refactoring.notes.method} from{" "}
              {refactoring.notes.target}
            </>
          )}
          {refactoring.name === "CHANGE DATA OWNERSHIP" && (
            <>
              Of {refactoring.notes.entity} to Service {service.microservice}
            </>
          )}
          {refactoring.name === "MOVE FOREIGN-KEY RELATIONSHIP TO CODE" && (
            <>
              Of {refactoring.notes.relationship} between{" "}
              {refactoring.notes.entities[0]} and{" "}
              {refactoring.notes.entities[1]}{" "}
            </>
          )}
          {refactoring.name === "CREATE DATA TRANSFER OBJECT" && (
            <>{refactoring.notes.created}</>
          )}
          {(refactoring.name === "FILE DEPENDENCY" ||
            refactoring.name === "IMPORT DEPENDENCY") && (
            <>
              {" "}
              Of{" "}
              {refactoring.notes.new_classes
                ? refactoring.notes.new_classes
                : refactoring.notes.interfaces}
            </>
          )}
        </p>
        <div className="intermediate-text">
          <p className="d-flex align-self-start ms-5">
            Refactoring schematic representation:
          </p>
          <img
            className="pb-3"
            style={{
              maxHeight: "25rem",
              maxWidth: "100%",
              alignSelf: "center",
            }}
            src={`data:image/png;base64,${refactoringItems.image}`}
            alt="refactoring change schema"
          ></img>
          <p>
            To apply this refactoring, follow the below sequence of steps (
            <b>click on each of them to find out how to implement them</b>):
          </p>
          {refactoring.name === "BREAK DATA TYPE DEPENDENCY" && (
            <DataTypeDependency
              project={project}
              service={service}
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
              refactoringItems2={refactoringItems2}
              setRefactoringItems2={setRefactoringItems2}
            ></DataTypeDependency>
          )}
          {refactoring.name ===
            "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL" && (
            <ServiceCall
              project={project}
              service={service}
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
              refactoringItems2={refactoringItems2}
              setRefactoringItems2={setRefactoringItems2}
            ></ServiceCall>
          )}
          {refactoring.name === "CHANGE DATA OWNERSHIP" && (
            <ChangeDataOwnership
              project={project}
              service={service}
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
              refactoringItems2={refactoringItems2}
              setRefactoringItems2={setRefactoringItems2}
            ></ChangeDataOwnership>
          )}
          {refactoring.name === "MOVE FOREIGN-KEY RELATIONSHIP TO CODE" && (
            <MoveForeignKey
              project={project}
              service={service}
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
              refactoringItems2={refactoringItems2}
              setRefactoringItems2={setRefactoringItems2}
            ></MoveForeignKey>
          )}
          {refactoring.name === "CREATE DATA TRANSFER OBJECT" && (
            <DTO
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
            ></DTO>
          )}
          {(refactoring.name === "FILE DEPENDENCY" ||
            refactoring.name === "IMPORT DEPENDENCY") && (
            <FileDependency
              project={project}
              service={service}
              refactoringItems={refactoringItems}
              setRefactoringItems={setRefactoringItems}
              refactoring={refactoring}
            ></FileDependency>
          )}
        </div>
      </Row>
    </>
  );
}

export default Refactoring;
