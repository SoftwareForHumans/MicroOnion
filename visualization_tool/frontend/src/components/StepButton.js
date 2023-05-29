import Button from "react-bootstrap/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

function StepButton({name, handleClick, index, active, hasNext, text}) {
  active = active === index;

  return (
    <>
      <Button
        onClick={() => handleClick(index, text)}
        id={index}
        name={name}
        size="lg"
        className={
          active ? "stepActive mb-3 p-2 step-button" : "mb-3 p-2 step-button"
        }
      >
        {name}
      </Button>
      {hasNext ? (
        <MdKeyboardDoubleArrowRight
          size={"20px"}
          className="d-inline ms-3"
          style={{ color: "#687f8c" }}
        ></MdKeyboardDoubleArrowRight>
      ) : (
        <></>
      )}
    </>
  );
}

export default StepButton;
