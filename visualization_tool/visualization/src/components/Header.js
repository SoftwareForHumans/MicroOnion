import Background from "../assets/background.jpeg";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLocation } from 'react-router-dom';

function Header() {
  let TitleHeader = false
  const pathname = useLocation();
  if (pathname.pathname === "/") {
    TitleHeader = true;
  }
  return (
    <div
      id="header"
      className="align-items-center"
      style={{
        backgroundImage: `url(${Background})`,
        display: "flex",
        flexDirection: "column",
        position: "sticky",
        zIndex: 1,
        top: 0
      }}
    >
      {TitleHeader && (
        <h3 
          className="mt-4"
          style={{ color: "#d3d3d3" }}>
          Assisted Refactoring Towards a Microservice Architecture
        </h3>
      )}
      <Link to="/"  style={{ textDecoration: "none", width: "min-content"}}>
        <img src={logo} alt="logo"></img>
      </Link>
      {/* <h1 style={{ color: "white" }}>MicroOnion</h1> */}
    </div >
  );
}

export default Header;
