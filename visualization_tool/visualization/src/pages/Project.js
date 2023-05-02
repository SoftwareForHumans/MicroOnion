import React from "react";
import { useLocation } from "react-router-dom";
import Decomposition from '../RestaurantServer.png';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Project() {
  let { state } = useLocation();
  const project = state.projectName;
  // let counter = 0
  // let [s, cl] = () => {
  //     let s = []
  //     let cl = []
  //     for(let i in services){
  //         s.push(i)
  //         cl.push(Object.values(services[i]))
  //     }
  //     console.log(s)
  //     console.log(cl)
  //     return [s, cl]
  // }

  return (
    <div
      className="my-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2>{project}</h2>
      <h5 className="my-2">Microservice candidates proposed</h5>
      <img src={Decomposition} alt="Logo" />
      <Link to="/sequence" state={{ projectName: project }} className="mt-4">
        <Button style={{backgroundColor: "#092256"}} size="lg">Show Refactoring Sequence Proposed</Button>{" "}
      </Link>

    </div>
  );
}

export default Project;
