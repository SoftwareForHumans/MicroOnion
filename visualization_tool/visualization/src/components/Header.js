import Background from "../assets/background.jpeg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "25vh",
      }}
    >
      <Link to="/" className="mt-4" style={{ textDecoration: 'none' }}>
        <h3 style={{ color: "#d3d3d3" }}>
          Assisted Refactoring Towards a Microservice Architecture
        </h3>
        
        <h1 style={{ color: "white" }}>OctopusRefact</h1>
      </Link>
    </div>
  );
}

export default Header;
