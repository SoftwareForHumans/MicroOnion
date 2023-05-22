import DataTypeDependency from "../components/DataTypeDependency";
import ChangeDataOwnership from "../components/ChangeDataOwnership";
import ServiceCall from "../components/ServiceCall";
import MoveForeignKey from "../components/MoveForeignKey";
import DTO from "../components/DTO";
import FileDependency from "../components/FileDependency";

function Refactoring(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const sequence = props.sequence;
  const refactoring = sequence[index];

  return (
    <>
      {refactoring.name === "BREAK DATA TYPE DEPENDENCY" && (
        <DataTypeDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></DataTypeDependency>
      )}
      {refactoring.name ===
        "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL" && (
        <ServiceCall
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></ServiceCall>
      )}
      {refactoring.name === "CHANGE DATA OWNERSHIP" && (
        <ChangeDataOwnership
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></ChangeDataOwnership>
      )}
      {refactoring.name === "MOVE FOREIGN-KEY RELATIONSHIP TO CODE" && (
        <MoveForeignKey
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></MoveForeignKey>
      )}
      {refactoring.name === "CREATE DATA TRANSFER OBJECT" && (
        <DTO
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></DTO>
      )}
      {(refactoring.name === "FILE DEPENDENCY" ||
        refactoring.name === "IMPORT DEPENDENCY") && (
        <FileDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></FileDependency>
      )}
    </>
  );
}

export default Refactoring;
