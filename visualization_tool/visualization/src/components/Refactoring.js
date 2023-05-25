import DataTypeDependency from "../components/DataTypeDependency";
import ChangeDataOwnership from "../components/ChangeDataOwnership";
import ServiceCall from "../components/ServiceCall";
import MoveForeignKey from "../components/MoveForeignKey";
import DTO from "../components/DTO";
import FileDependency from "../components/FileDependency";

function Refactoring({project, service, index, sequence, showNumber, selected, color, step, setSelected, setColor, setStep, image}) {
  const refactoring = sequence[index];
  showNumber = showNumber !== undefined? showNumber: false;
  return (
    <>
      {refactoring.name === "BREAK DATA TYPE DEPENDENCY" && (
        <DataTypeDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></DataTypeDependency>
      )}
      {refactoring.name ===
        "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL" && (
        <ServiceCall
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></ServiceCall>
      )}
      {refactoring.name === "CHANGE DATA OWNERSHIP" && (
        <ChangeDataOwnership
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></ChangeDataOwnership>
      )}
      {refactoring.name === "MOVE FOREIGN-KEY RELATIONSHIP TO CODE" && (
        <MoveForeignKey
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></MoveForeignKey>
      )}
      {refactoring.name === "CREATE DATA TRANSFER OBJECT" && (
        <DTO
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></DTO>
      )}
      {(refactoring.name === "FILE DEPENDENCY" ||
        refactoring.name === "IMPORT DEPENDENCY") && (
        <FileDependency
          project={project}
          service={service}
          index={index}
          refactoring={refactoring}
          showNumber={showNumber}
          selected={selected}
          color={color}
          step={step}
          setSelected={setSelected}
          setColor={setColor}
          setStep={setStep}
          image={image}
        ></FileDependency>
      )}
    </>
  );
}

export default Refactoring;
