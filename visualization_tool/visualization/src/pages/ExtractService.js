import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTypeDependency from "../components/DataTypeDependency";
function ExtractService() {
  let { state } = useLocation();
  const project = state.projectName;
  const service = state.service;
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [dependencies, setDependencies] = useState();
  const [dependents, setDependents] = useState();
  const [loading, setLoading] = useState(false);

  function updateDependencies(dep) {
    const results = [];
    // [microservico, {dependencia}]
    // dep.forEach(d =>{
    //     results.append(<tr key={d[0]}>
    //       <td>{}</td>
    //       <td>{val.age}</td>
    //       <td>{val.gender}</td>
    //     </tr>)
    // })
  }

  useEffect(() => {
    try {
      axios
        .get(
          `http://localhost:8000/projects/${project}/serviceDependencies/${service.microservice}`
        )
        .then((res) => {
          setFrom(res.data.from);
          setTo(res.data.to);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    if (from !== undefined) setLoading(true);
  }, [from]);

  return (
    <>
      {!loading ? (
        <></>
      ) : (
        <Container className="mt-3 mb-5">
          <Row>
            <h4 className="mb-4">Extract service {service.microservice}</h4>
            <h6>
              To extract the service, identify the dependencies to the monolith
              and of the monolith to the service:
            </h6>
          </Row>
          <Row
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col lg={10}>
              <Row className="mt-3 mb-2">
                <h6>Service dependencies to the Monolith</h6>
              </Row>
              <table style={{ border: "2px solid #092256", width: "100%" }}>
                <thead>
                  <tr>
                    <th className="px-3">Microservice</th>
                    <th className="px-3">File</th>
                    <th className="px-3">Dependent File</th>
                    <th className="px-3">Dependencies</th>
                  </tr>
                </thead>
                <tbody>
                  {from.map(([key, dependency]) => {
                    let res = "";
                    return Object.keys(dependency).map((k) => {
                      return (
                        <tr>
                          <td>{key}</td>
                          <td>{k}</td>
                          <td>{dependency[k][0][0]}</td>
                          {dependency[k][0].map((v, index) => {
                            if (v !== dependency[k][0][0]) {
                              res += v;
                              if (index !== dependency[k][0].length - 1) {
                                res += " ,";
                              }
                            }
                          })}
                          <td>{res}</td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
              {/*           
          {from.map(([microservice, dependencies]) =>{
            <div> {microservice}</div>
          })} */}
            </Col>
            <Col lg={10}>
              <Row className="mt-3 mb-2">
                <h6>Service dependents from the Monolith</h6>
              </Row>
              <table style={{ border: "2px solid #092256", width: "100%" }}>
                <thead>
                  <tr>
                    <th className="px-3">Microservice</th>
                    <th className="px-3">File</th>
                    <th className="px-3">Dependent File</th>
                    <th className="px-3">Dependencies</th>
                  </tr>
                </thead>
                <tbody>
                  {to.map(([key, dependency]) => {
                    let res = "";
                    return Object.keys(dependency).map((k) => {
                      return (
                        <tr>
                          <td>{key}</td>
                          <td>{k}</td>
                          <td>{dependency[k][0][0]}</td>
                          {dependency[k][0].map((v, index) => {
                            if (v !== dependency[k][0][0]) {
                              res += v;
                              if (index !== dependency[k][0].length - 1) {
                                res += " ,";
                              }
                            }
                          })}
                          <td>{res}</td>
                        </tr>
                      );
                    });
                  })}
                </tbody>
              </table>
            </Col>
          </Row>

          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            className="my-5"
          >
            To extract this service, we suggest the following sequence of
            refactorings:
          </Row>
          <Row>
            {/* cards com o refactoring e com quem é feito, ao clicar no refactoring nasce por baixo a sua representação */}
            <DataTypeDependency></DataTypeDependency>
          </Row>
          <Link
            to="/extractionSequence"
            state={{ service: service.microservice, projectName: project }}
            className="my-4"
          >
            <Button style={{ backgroundColor: "#092256" }} size="md">
              Extract Next Service
            </Button>{" "}
          </Link>
        </Container>
      )}
    </>
  );
}

export default ExtractService;
