import Card from "react-bootstrap/Card";
import { Link } from 'react-router-dom';
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div>
      <div
        className="my-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          text="light"
          style={{
            width: "58rem",
            height: "18rem",
          }}
        >
          <Card.Body
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize:'18px',
              background: 'rgba(30,72,143,0.8)',
              borderColor: "#1E488F",
            }}
          >
            This tool was created as part of a dissertation on assisted refactoring in the context of a microservice architecture. 
            It gets two files as input: one with the proposal of separating the files into different microservices and another with the source code representation. The format of these files can be found in Github's README file.
            This website graphically displays the tool's results for three Java Spring projects in order to improve the developer experience and provide additional information on how to conduct the migration. 
            We propose a Strangler Fig approach to the migration, taking incremental steps that are reversible, reducing the risks.
            You can find more information on the dissertation document.
          </Card.Body>
        </Card>
      </div>
      <Link to="/chooseProject"><Button className="mb-5" variant="dark" style={{backgroundColor: "#092256"}}>
        Let's get started!
      </Button></Link>
      {/* {" "} */}
      <div>
        <p>
          Check the source code and documentation on{" "}
          <a href="https://github.com/RitaPeixoto/FEUP-Microservices_assisted_refactoring">
            Github
          </a>
        </p>
        <p>
          Further documentation: <a href="">here (dissertation)</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
