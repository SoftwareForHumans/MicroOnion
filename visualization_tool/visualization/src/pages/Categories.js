import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function Categories() {
  let { state } = useLocation();
  const project = state.projectName;
  return (
    <Container
      style={{
        display: "block",
        alignItems: "center",
        justifyContent: "around",
        paddingTop: "8%",
      }}
    >
      <Row style={{ color: "white" }}>
        <Col className="my-2" lg={2}>
          <Link
            to="/extractionSequence"
            state={{ projectName: project }}
            className="mt-4"
          >
            <Button
              size="lg"
              style={{
                backgroundColor: "#092256",
                height: "30vh",
                width: "35vh",
                borderRadius: "60px",
              }}
            >
              Extract Services
            </Button>
          </Link>
        </Col>
        <Col style={{
        paddingTop: "8%",
        paddingLeft:'7%'
      }}>
          <Row>
            <BsFillArrowRightCircleFill
              style={{ color: "black", fontSize: "1.5em" }}
            />
          </Row>
          <Row>
            <BsFillArrowLeftCircleFill
              style={{ color: "black", fontSize: "1.5em" }}
            />
          </Row>
        </Col>
        <Col className="my-2" lg={2} >
          <Link
            to="/infrastructure"
            state={{ projectName: project }}
            className="mt-4"
          >
            <Button
              size="lg"
              style={{
                backgroundColor: "#1E488F",
                height: "30vh",
                width: "35vh",
                borderRadius: "60px",
              }}
            >
              Infrastructure Improvement
            </Button>
          </Link>
        </Col>
        <Col style={{
        paddingTop: "8%",
        paddingLeft:'7%'
      }}>
          <BsFillArrowRightCircleFill
            style={{ color: "black", fontSize: "1.5em" }}
          />
          <Row>
            <BsFillArrowLeftCircleFill
              style={{ color: "black", fontSize: "1.5em" }}
            />
          </Row>
        </Col>
        <Col className="my-2" lg={2}>
          <Link
            to="/deployment"
            state={{ projectName: project }}
            className="mt-4"
          >
            <Button
              size="lg"
              style={{
                backgroundColor: "#3C76E1",
                height: "30vh",
                width: "35vh",
                borderRadius: "60px",
              }}
            >
              Deployment and Orchestration
            </Button>
          </Link>
        </Col>
        <Col style={{
        paddingTop: "8%",
        paddingLeft:'7%'
      }}>
          <BsFillArrowRightCircleFill
            style={{ color: "black", fontSize: "1.5em" }}
          />
          <Row>
            <BsFillArrowLeftCircleFill
              style={{ color: "black", fontSize: "1.5em" }}
            />
          </Row>
        </Col>
        <Col className="my-2" lg={2}>
          <Link
            to="/principles"
            state={{ projectName: project }}
            className="mt-4"
          >
            <Button
              size="lg"
              style={{
                backgroundColor: "#1E9AB0",
                height: "30vh",
                width: "35vh",
                borderRadius: "60px",
              }}
            >
              Check Microservices Principles
            </Button>
          </Link>
        </Col>
      </Row>
      <h6 className="mt-4" style={{color: "#1E488F"}}>This categories do not have a specific order, as they can be interchanged whenever you find suitable.
      </h6>
    </Container>
  );
}

export default Categories;
