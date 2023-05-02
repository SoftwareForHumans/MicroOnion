import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";

function ChooseProject(props) {
  let descriptions = {
    "Restaurant Server": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Proyecto UNAM": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    "Hotel Management System": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  };
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("Choose the project");
  useEffect(() => {
    setDescription(descriptions[project]);
  }, [project, descriptions]);
  return (
    <div
      className="my-5"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Choose the project you want to test</h3>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <DropdownButton
          id="dropdown-basic-button"
          title={project}
          variant="secondary"
          size="lg"
          className="my-5 mx-5"
        >
          <Dropdown.Item
            id="Restaurant Server"
            onClick={(e) => setProject(e.target.id)}
          >
            {" "}
            Restaurant Server
          </Dropdown.Item>
          <Dropdown.Item
            id="Proyecto UNAM"
            onClick={(e) => setProject(e.target.id)}
          >
            {" "}
            Proyecto UNAM
          </Dropdown.Item>
          <Dropdown.Item
            id="Hotel Management System"
            onClick={(e) => setProject(e.target.id)}
          >
            Hotel Management System
          </Dropdown.Item>
        </DropdownButton>
        <div>{description}</div>
      </div>

      <Link to="/project" state={{ projectName: project }} className="mt-4">
        <Button style={{backgroundColor: "#092256"}} size="lg">Next</Button>{" "}
      </Link>
    </div>
  );
}

export default ChooseProject;
