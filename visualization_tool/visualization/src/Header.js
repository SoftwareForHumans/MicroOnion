import Background from "./background.jpeg";

function Header() {
  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        height: "30vh",
      }}
    >
      <h3 style={{ color: "gray" }}>Assisted Refactoring Towards a Microservice Architecture</h3>
      <h1 style={{ color: "white" }}>MicrOnion</h1>
    </div>
  );
}

export default Header;
