import DataTypeDependency from "../components/DataTypeDependency";
import ChangeDataOwnership from "../components/ChangeDataOwnership";
import ServiceCall from "../components/ServiceCall";
import MoveForeignKey from "../components/MoveForeignKey";
import DTO from "../components/DTO";
import ImportDependency from "../components/ImportDependency";
import FileDependency from "../components/FileDependency";

function Refactoring(props) {
  const project = props.project;
  const service = props.service;
  const index = props.index;
  const sequence = props.sequence;
  const refactoring = sequence[index];
  return (
    <>
      {refactoring.name === "DATA TYPE DEPENDENCY" && (
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
      {refactoring.name === "DTO" && (
        <DTO
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></DTO>
      )}
      {refactoring.name === "FILE DEPENDENCY" && (
        <FileDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></FileDependency>
      )}
      {refactoring.name === "IMPORT DEPENDENCY" && (
        <ImportDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
        ></ImportDependency>
      )}
    </>
  );
}

export default Refactoring;
