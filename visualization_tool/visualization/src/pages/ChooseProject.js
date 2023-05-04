/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import RestaurantServer from "../assets/RestaurantServer.png";

function ChooseProject(props) {
  let descriptions = {
    "Restaurant Server":
      "An event based server for the operation of a restaurant regarding their table service, reservations, bills, among others.",
    "Proyecto UNAM":
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "Hotel Management System":
      "A hotel information management system. It supports the management of employees, guests, rooms, logistics, lost items and finances.",
  };
  let gits = {
    "Restaurant Server": "https://github.com/asledziewski/restaurantServer",
    ProyectoUNAM: "https://github.com/CocayUNAM/ProyectoUNAM",
    "Hotel Management System":
      "https://github.com/NiuPiFiveTeam/HotelManageSystem",
  };
  const [description, setDescription] = useState("");
  const [git, setGit] = useState("");
  const [project, setProject] = useState("Choose the project");
  useEffect(() => {
    setDescription(descriptions[project]);
    setGit(gits[project]);
  }, [project, descriptions, gits]);
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
      <h6 className="mt-2" style={{ color: "#092256" }}>
        From the 3 available projects, choose the one you want to see the
        proposed refactoring sequence
      </h6>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <DropdownButton
          id="dropdown-basic-button"
          title={project}
          variant= "secondary"
          className="my-3"
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
        {
          description && (
            <div style={{ width:"60rem", background: '#687f8c', color:"#ededed", borderRadius:"15px", 'box-shadow': '0 0 1em 0 rgba(0, 0, 0, 0.2)'}} className="m-2 p-4">
              <div>
                {description}
                <br></br> You can find more on its{" "}
                <a style={{color: "#ededed", fontWeight:"bold"}}href={git}>Github repository</a>.
              </div>
              <div className="my-3" style={{ fontWeight: "bold", color: "#e3e3e3" }}>
                Microservices proposition
              </div>
              <img src={RestaurantServer} />
            </div>
          )
        }
      </div>
      {description && (
        <Link
          to="/categories"
          state={{ projectName: project }}
          className="my-4"
        >
          <Button style={{ backgroundColor: "#092256" }} size="md">
            Show Proposed Migration
          </Button>{" "}
        </Link>
      )}
    </div>
  );
}

export default ChooseProject;
