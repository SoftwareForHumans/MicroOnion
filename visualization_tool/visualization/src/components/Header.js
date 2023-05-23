import Background from "../assets/background.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "20vh",
      }}
    >
      <Link to="/" className="mt-4" style={{ textDecoration: "none" }}>
        <h3 style={{ color: "#d3d3d3" }}>
          Assisted Refactoring Towards a Microservice Architecture
        </h3>
      <img src={logo}  alt="logo"></img>

        {/* <h1 style={{ color: "white" }}>MicroOnion</h1> */}
      </Link>
    </div>
  );
}

export default Header;
