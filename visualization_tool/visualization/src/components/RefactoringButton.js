import Button from "react-bootstrap/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Col from "react-bootstrap/Col";

function RefactoringButton(props) {
  const item = props.item;
  const handleClick = props.handleClick;
  const sequence = props.sequence;
  const index = props.index;
  const color = props.color;
  const active = props.active;
  const showNumber = props.showNumber !== undefined ? props.showNumber : true;

  return (
    <>
      <Col className="d-inline">
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
          {showNumber ? (index + 1).toString() + ". " : " "}
          {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
        </Button>
      </Col>

      {index < sequence.length - 1 ? (
        <Col className="d-inline mx-3">
          <MdKeyboardDoubleArrowRight
            size={"20px"}
            className="d-inline"
            style={{ color: showNumber? "white": "#687f8c" }}
          ></MdKeyboardDoubleArrowRight>
        </Col>
      ) : (
        <></>
      )}
    </>
  );
}

export default RefactoringButton;
