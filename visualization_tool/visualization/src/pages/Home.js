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
            width: "50rem",
            height: "15rem",
          }}
        >
          <Card.Body
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1E488F"
            }}
          >
            Explanation about how this works
          </Card.Body>
        </Card>
      </div>
      <Link to="/chooseProject"><Button className="mb-5" variant="dark" style={{backgroundColor: "#092256"}}>
        Let's get started
      </Button></Link>
      {/* {" "} */}
      <div>
        <p>
          Check the source code of this tool at{" "}
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
