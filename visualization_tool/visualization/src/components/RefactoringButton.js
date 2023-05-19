import Button from "react-bootstrap/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";


function RefactoringButton(props) {
  const item = props.item;
  const handleClick = props.handleClick;
  const sequence = props.sequence;
  const index = props.index;
  const color = props.color;
  const active = props.active;

  return (
    <>
      <Button
        onClick={() => handleClick(index)}
        id={item.id}
        name={item.name}
        size="lg"
        className={
          active
            ? "isActive mb-3 p-2 squared-button"
            : "mb-3 p-2 squared-button"
        }
        style={{
          backgroundColor: color,
          borderColor: color,
        }}
      >
        {(index + 1).toString() +
          ". " +
          item.name.charAt(0) +
          item.name.slice(1).toLowerCase()}
      </Button>
      {index !== sequence.length - 1 ? (
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

export default RefactoringButton;
