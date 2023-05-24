import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import restaurantServer from "../assets/restaurantServer_microservices.png";
import proyectUNAM from "../assets/proyectoUNAM_microservices.png";
import hotelManagementSystem from "../assets/hotelManagementSystem_microservices.png";
import monolith from "../assets/monolith.png";
import microservices from "../assets/microservices.png";
import arrow from "../assets/arrow.png";

function NewChoose() {
  let descriptions = {
    "Restaurant Server":
      "An event based server for the operation of a restaurant regarding their table service, reservations, bills, among others.",
    "Proyecto UNAM":
      "A system to manage UNAM (Universidad Nacional Autónoma de México). It supports courses, inscriptions, professors, students, certifications and much more.",
    "Hotel Management System":
      "A hotel information management system. It supports the management of employees, guests, rooms, logistics, lost items and finances.",
  };
  let gits = {
    "Restaurant Server": "https://github.com/asledziewski/restaurantServer",

    "Hotel Management System":
      "https://github.com/NiuPiFiveTeam/HotelManageSystem",
    "Proyecto UNAM": "https://github.com/CocayUNAM/ProyectoUNAM",
  };
  const [description, setDescription] = useState("");
  const [git, setGit] = useState("");
  const [project, setProject] = useState("Choose the project");
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [showIntendedDecomposition, setShowIntendedDecomposition] =
    useState(false);

  useEffect(() => {
    setDescription(descriptions[project]);
    setGit(gits[project]);
  }, [project, descriptions, gits, showProjectDetails]);

  useEffect(() => {
    setShowIntendedDecomposition(false);
    setShowProjectDetails(false);
  }, [project]);
  return (
    <div className="my-4 p-0 mx-0 center-all flex-column">
      <h5 className=" blue-text">
        From the 3 available projects, choose the one you want to see the
        proposed refactoring sequence
      </h5>
      <p style={{ fontSize: "0.7rem", width:"48%"}}>
        This tool receives two files as input: one with information about the
        monolith source code, and another with information about which services
        we intend to have after the system is refactored.
        <br></br>
        In the future, this tool will receive any two files, however, at this
        time we want you to focus on the 3 example projects that you can select
        below.
      </p>
      <div className="center-all flex-column">
        <DropdownButton
          className="my-3 dropdown-button"
          id="dropdown-button"
          title={project}
        >
          <Dropdown.Item
            className="dropdown-item"
            id="Restaurant Server"
            onClick={(e) => setProject(e.target.id)}
          >
            {" "}
            Restaurant Server
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-item"
            id="Proyecto UNAM"
            onClick={(e) => setProject(e.target.id)}
          >
            {" "}
            Proyecto UNAM
          </Dropdown.Item>
          <Dropdown.Item
            className="dropdown-item"
            id="Hotel Management System"
            onClick={(e) => setProject(e.target.id)}
          >
            Hotel Management System
          </Dropdown.Item>
        </DropdownButton>
      </div>
      {description && (
        <>
          <Row className="mt-2 ms-5">
            <Col className="mt-4 ms-4 center-all">
              <Row className="center-all" style={{ width: "250px" }}>
                <img src={monolith} alt="monolith"></img>
                <Button
                  className="mt-4 choose-project-buttons"
                  size="sm"
                  style={{ width: "200px" }}
                  onClick={() => {
                    setShowProjectDetails(true);
                    setShowIntendedDecomposition(false);
                  }}
                >
                  Show Project Description
                </Button>
              </Row>
            </Col>
            <Col className="mt-5 mx-5">
              <Row className="mt-3 center-all" style={{ width: "300px" }}>
                <img src={arrow} style={{ width: "200px", height:"60px" }} alt="arrow"></img>
                <Link
                  to="/extractionSequence"
                  state={{ projectName: project }}
                  className="mt-4"
                >
                  <Button size="sm" className="px-3 choose-project-buttons">Show Proposed Refactoring Sequence</Button>{" "}
                </Link>
              </Row>
            </Col>
            <Col className="center-all">
              <Row className="center-all" style={{ width: "300px" }}>
                <img src={microservices} alt="microservices"></img>
                <Button
                  className="mt-4 choose-project-buttons"
                  size="sm"
                  style={{ width: "220px" }}
                  onClick={() => {
                    setShowProjectDetails(false);
                    setShowIntendedDecomposition(true);
                  }}
                >
                  Show Intended Decomposition
                </Button>
              </Row>
            </Col>
          </Row>
        </>
      )}
      {showProjectDetails && (
        <Row
          className="m-5 p-4 text-white information-box"
        >
          <h5 style={{ color: "#e6e6e6", fontSize: "1.3rem" }}>
              {" "}
              Project Description
            </h5>
          <p>
            {description}
            <br></br> You can find more on its{" "}
            <a style={{ fontWeight: "bold", color: "#092256" }} href={git}>
              Github repository
            </a>
            .
          </p>
        </Row>
      )}
      {showIntendedDecomposition && (
        <>
          <Row
            className="m-5 p-4 text-white information-box"
          >
            <h5 style={{ color: "#e6e6e6", fontSize: "1.3rem" }}>
              {" "}
              Intended Microservices Decomposition
            </h5>
            <p className="mb-3">
              The following schema represents the decomposition of the current
              monolith system into different microservices as proposed in the
              input file (click on the image to zoom in).
            </p>

            {project === "Restaurant Server" && (
              <Link to="https://www.plantuml.com/plantuml/svg/VPFTRjim38Nl_HJU2nZxlsxMhi263GYI5hiSL8TnkD6YGT7DWg3lFYiE50LITMLPvuZd8sNVE3MYOq_L6zr13_L01crbY7Z_kyT_QBkAOAkrSYtOxRJUe42hoBQggYtJ1gH-UwpgkYNZNEsW7GNrqFo2f_LvVSjsYzqenfzAdN_ssdpVwsBKtLUhSbWoMYtQ7lWls7ia1NdLjnH-niraU0cOxpAO3kGPMsWUfyKTg45owtdhMpzGy0iCx51P3YVdAhnE3h0wLPeViroNSvQ2jiM18DXYTOw_Q2rR5IO2ESctuJNgxFqnuVY2HDdDfIT7jacu5mlXNex2azDHwNALO8khfNEEdV6yyywB8nhBXsE2kNemJmG1y7e-ivhbdfKoyUp9adnCB-WEtIvKMO5JCugnwj505iD0sCO_J9Gqdxta94rwkN07Niv-Hf-EsRR0rpsn5Bxxo9NmH5e1At9bwJvVwBOiVIFW1hOE_D--Eg-30tg3rFmqI8N4nQZH8DAMc20x48vl-Hhg1tTexwVLzVOQE_iudFPVgXkmcx6d_m00">
                <img
                  style={{ width: "90%" }}
                  src={restaurantServer}
                  alt="Restaurant Server microservice candidate schema"
                />
              </Link>
            )}
            {project === "Proyecto UNAM" && (
              <Link to="https://www.plantuml.com/plantuml/svg/bLRThY8t3BxdAQOlWFhVNYw5izLAHOk0rRb4wSGCgK8SEHuu2FNTEoS4I2Ov0xr3_ZxR-VpZuPDZGTpkzUWxti4UAgk5CYEXDHutU_McJ3FIiEMAiIBLxBYIYg1cXMOqsgAMGDNtvr5LWM75fsgF4lJunR6GsBSk2BVWa3fxhOLp5O75m5s2lPbhD4oeDT1uYiQrciNLTNg3Ikmh2zmmRuvIRLKjA3WCaoRk4lD6SWpsFLSDpc4S8r6xRiba9VWJ351k9I5nOqlbkMdo1OeVi0GXWOer3Mc2IsHEycImVt5ibNpFFsCS_Njh-GzPoxyOLvEojK8prCY8blUeLza78IFuwORd8OFs24Wha41f4NxCYZ05Ofz8OkaPCt2re4OyUErKAp0CKR1XVaIS2wSE9Re3EgWQndzXqoZJfE8xuyQTN12Usk40XZ70VRt1CVNwHdfpBB03qBUcIKhw9grKZAJokeMKSGMIFO6wfIxJsChjU0LDIqeAkPXzZfhuqpdVnjOMs_U7u7htS6e_TFV0atFgkRswUjk3Evddo2v6-Zx98N0OxMjPVZvde_CAVw_2prB3-tSbm-kM77u4gdp_ujp7U-ubS4jcVRBmrS1pnFKHdoJk2E0-3prX6U0LPTP8IZHdlvpZlcrL4yR9_qxxz4gAWQOXU5GhR_9keKQfJ-XjFZL3Fa-TnDW__pGDHRzoeahyUXuSVI_I5OJdtojbCKnLVcoyIyyOUGmjqSCLdpwAu0d3gtwHERogQHx9eH0pnluilRpLe4kpv1qykiJZN5ZRpnG-29uN1FfkXMRzTkwjgsi5gUXxa5zhpIAmN0bVGjrQe4kLXGCZIgmNgLZG0cYhTA-ByHjAVpovTPlsOyebPa3Icp0_JQpzve1cm49f5mv4nbk1aVEE4E7P-z_4tcfu5vb_hqhFpBShl3E5Lk6J5dfzwzFlzpv5bsqgg15-FOCb6QObE8l6WV-tgEgd0dpfL9NqmZ_G8VY_MCM4I0J5C1afaoHmF3aeX-w2poPVOopNaX2uwmeH4hZPEZL_Lfe9Bp4xh1gguK8qoWY-dFvFO6Ixr_y1">
                <img
                  style={{ width: "90%" }}
                  src={proyectUNAM}
                  alt="ProyectoUNAM microservice candidate schema"
                />
              </Link>
            )}
            {project === "Hotel Management System" && (
              <Link to="https://www.plantuml.com/plantuml/svg/fLdTSXev4xtdAVXUWChFb-pkNHp6SR6Ln5xm9fTRyao3bMZKhAInJL5vznsDF2s1Hen8Rfn8Edsw-tJh1tYd3LEcgSNaV-OUQfXk1UDomeJ0ntzg_iJbPY9WRQO6fuflxisquWfAmr5E9ciK5QZfY_raEYq5qtgg4EkP1lN0IvWjFWX4jNAZGqXZk9ZTAe3FM1qjbIYDGY50pJhxEOs7lHmv0McusKq5RhWslDGp2vuBO7BcbcRBVc899QgAM0TCmc38B0uepvGy9ZAABBBya0xaXBJ8C5f4LgIW1OUI3QzOzO_IKB15pGsgvzKbZHCunn_0o5DM6QEs83a6M-yWzHojACweTSAGioj4rkVNASTM6oo_Xp5VDsPbKB4DnE7cvvjl6fR-2re6zpVYoGgz0CEuW43gZ3sUyduozifWmgoulJvi8GkrguN1oGyw1b_k2VKLrNUgtVkIKS4MzLQCemuH5KEtMZ2avDsI-xzRFR7a4aYjNjPR1mXy2guDI52pYxK1TM7QGGcViEBhtSLsAtRsR6evRXIMe3MgG-j7k7FK_WXBqJlc0hQcvLNu01_TKih0ze4oxrdv_TdqKbO-YdIIVpMWTc6Qh3JyWHlkhYABNmjy_C8KPtS2WhA-siSsj2rxEohSCRB2cd59_0ULWBOPS0VG1thfniH2WDuV8O9kIWUNYerO_Nr3nBvWsK74m8eXWGg6umc7TT4xRQ2UVSGD3sxQSOwem3N8PlQf_JEGKubrZRBhqyidS_6DFIr1Rr5gE8QiG6kEyc_3OwL30Pzxi80rb-qIobDAsfPh7PSWBAzE0cohTx0amdn0LIUxBWhAwkCx-_NUorh1bYbJjwDUs89cY3y0qGveOOOw8SO54bbag4gQT8IpOjX1gBUI2HYRy0Y46cUSQexr7JuTjyWTCAbdxzk_hfe_9gJm__S4Ral0P9iRNJs1XlBvWgQSqpR-TYIpy5vFM_OzGLPfR5WrZmzBbxQa5cpXQwxg9PJ0j-QSm5mjnZtSi5sMkaISysWYROSU7lavzDQdSt6x-5EBj9qJxCmtlcyQ3Mg90YYVAuNDjfrnfpyrBU7SsCDY9bzTX_ALpV1A8euw3dCdKCKmG33CuA4DwlLvw_KnYZs0e3Xlkw4ByaWXX-pf7V2Onju8RiMBSfg1eii9w3GLFSHEO0OyzI-c6RDlDNSVPZpL8dCtlkbW_fbr3BS5TA7OwlteA_9Rul7xs0u6gn6-qEp_epTlDsjzZF6cEQasqUlKcliA3pBOs_KM3HCMwwxPb9zRriBS1xCqYAexx6hSIuQ3-JrJ9eqeksMgsU--PWBQYfAu7-qeKjTXtC11Zim77kdXwtm8JHynHXkMxFpfvO88ovWEbLfXEED5RigE8hbCHGwTL0pTQd2N-BFiZ-0LLZ81ic9AzwIhyXwgHbm-XCymGdNC8QHW6AD2nURFantQAnSRaJ8XFUcJYQPjFvuXrISh_2voi5DfPW9dobiOp4HIaLFW3jMxFmqDKKbP2KK5o4KcnQTpPmcw4UPFZJBHNnHXUDo_VB5FFQF2UbqtPc1xHXPkElYcAeTx8S-WBd05iafy_lkcRxfNzByDQ9FZUcKdlFUyQ6q06JPq8ladA5LzpAGLy7mR4ZtRf4j_35qPj0KD-ZfL6v_egEj8avoUocR_2VcyUha1TUB5NoSMhTlTPx0t7bExmk2ew-mghExnqGltbSihnUaTUL9jjsjoV2na3Y7nPNuCSpakQNmg18UbA4xpka0oYTtMjSp--7iPVx2tfRnMxMh_ON3PJwIXf0nXIPoaIN2ea1MTApc-5h6px5H8tomqNUf9ax0eP1RKnIl-AbPSCy7Kpc-8RaWv3OBx41ssyvP21Zexj1TvB9B5-Q6GkdbW4ZTjuPKbgvIshuSkSu4QhX0hVV3YxYUz62TDIH4oJ9wJePbRyjxEGvCe8q75CQMDGZd9Rb3Cu3k_ZNrGXF9TsObOEWUak3eKnJG8MQGnOQGTQkYdCuTq0uSw8gaCkld2O6ff8TTebttkR-9D-lol-qZOtNAX81-YLQzE1XNf4VEGDkCa_ZjB1Sn0D-dMpmbXyGinqFwEENx9cCw839BeDuSC6zzQ0yxzuccguI9cQHUBdsyxgDg8IQfpWwRrc-7jFl5ZOzbeWtN_umnd6yNgAv2Wc44rkr26hrk3Gh77XTH6DQqnoWJNV81hpkG3q_a6tldF1UomkwE0MoNUWQoQMlm7">
                <img
                  style={{ width: "90%" }}
                  src={hotelManagementSystem}
                  alt="Hotel Management System microservice candidate schema"
                />
              </Link>
            )}
          </Row>
        </>
      )}
    </div>
  );
}

export default NewChoose;
