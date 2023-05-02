import React, { useState } from "react";
import { useLocation } from "react-router-dom";
function Sequence() {
  let { state } = useLocation();
  const project = state.projectName;
  return <div>{project}</div>;
}

export default Sequence;
