import React from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";


function ShowState() {
  let { state } = useLocation();
  const project = state.projectName.replaceAll(" ", "");
  const stateObject = state.stateObject


  return (
    <Container className="my-5 pb-5 col-major">
      <p>{project}</p>
    </Container>
  );
}

export default ShowState;
