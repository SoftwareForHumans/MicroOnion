import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import init from "../assets/service0_start.png";
import final from "../assets/service0_end.png";

function ShowState() {
  let { state } = useLocation();
  const service = state.service
  const project = state.projectName.replaceAll(" ", "");
  const stateObject = state.stateObject;
  const initial = state.initial;
  let str = project + " - Service " + service
  str += initial? " Initial":" Final"
  str += " state" 
  return (
    <Container className="my-5 pb-5 col-major">
      <h5>
        {str}
      </h5>
      <img className="mt-5" style={{ width: "90%" }} src={initial? init:final} alt=""></img>
    </Container>
  );
}

export default ShowState;
