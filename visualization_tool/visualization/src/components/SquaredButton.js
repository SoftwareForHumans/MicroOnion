import Button from "react-bootstrap/Button";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import "../styles/service.css"

function SquaredButton(props) {
  const item = props.item;
  const handleClick = props.handleClick;
  const sequence = props.sequence;
  const index = props.index;
  const color = props.color;
  return (
    <>
      <Button
        onClick={() => handleClick(index)}
        id={item.id}
        name={item.name}
        size="lg"
        className="mb-3 p-2 squared-button"
        style={{
          backgroundColor: color,
          borderColor: color,
          height: "12vh",
          width: "12vh",
          fontSize: "0.8rem",
          borderRadius: "12%",
          boxShadow: "0 0 1em 0 rgba(0, 0, 0, 0.2)",
        }}
      >
        {(index + 1).toString() + ". " + item.name.charAt(0) + item.name.slice(1).toLowerCase()}
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

export default SquaredButton;
