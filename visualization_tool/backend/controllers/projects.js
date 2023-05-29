const fs = require("fs");
const path = require("path");
const utils = require("../utils/utils.js");
const umls = require("../utils/umls.js");

exports.getProjects = async (req, res) => {
  res.status(200).send("hello");
};

exports.getRefactoringsSequence = async (req, res) => {
  const { name } = req.params;

  const folder = utils.getProjectFolder(name);

  try {
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/refactorings_sequence.json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);
    let arr = Array.from(jsonData["refactorings"]);

    let response = [];
    // level 1
    for (i in arr) {
      let m = {};
      m["id"] = arr[i]["id"];
      m["name"] = arr[i]["name"];
      m["level"] = arr[i]["level"];
      m["microservice"] = arr[i]["microservice"];
      m["dependent_microservice"] = arr[i]["dependent_microservice"];
      m["notes"] = arr[i]["notes"];
      response.push(m);
    }

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getServiceDependencies = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let { index } = req.params;

  try {
    service = service.toString();
    index = parseInt(index);
    const folder = utils.getProjectFolder(project);
    let response = {};
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot" + index + ".json"
    );

    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);

    response["from"] = [];
    response["to"] = [];
    jsonData["services"].forEach((el) => {
      if (el["id"] === service) {
        for (let j in el["dependencies"])
          response["from"].push([j, el["dependencies"][j]]);
      } else {
        for (let j in el["dependencies"]) {
          if (j === service) {
            response["to"].push([el["id"], el["dependencies"][j]]);
          }
        }
      }
    });

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getServiceExtractionSequence = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let response = {};

  try {
    service = service.toString();
    const folder = utils.getProjectFolder(project);
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/refactorings_sequence.json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);

    let refactorings = [];
    let counter = 0;
    let skip = false;
    jsonData["refactorings"].forEach((i) => {
      if (skip) return;
      counter++;
      if (
        i["microservice"] === parseInt(service) &&
        i["name"] == "EXTRACT MICROSERVICE"
      ) {
        refactorings = i["refactorings"];
        skip = true;
      }
    });

    response["sequence"] = refactorings;

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getInitialState = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let { index } = req.params;

  try {
    service = service.toString();
    index = parseInt(index);

    const folder = utils.getProjectFolder(project);
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot" + index + ".json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);
    initialState = jsonData["services"];
    umls.createInitialStateUML(folder, service, initialState);

    const filename = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/states/service" + service + "_initial" + "_state.png"
    );

    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    const content = fs.readFileSync(filename, { encoding: "base64" });
    res.end(content);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getFinalState = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let { index } = req.params;

  try {
    service = service.toString();
    index = parseInt(index);

    const folder = utils.getProjectFolder(project);
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot" + (index + 1) + ".json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);
    finalState = jsonData["services"];
    umls.createFinalStateUML(folder, service, finalState);

    const filename = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/states/service" + service + "_final" + "_state.png"
    );

    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    const content = fs.readFileSync(filename, { encoding: "base64" });
    res.end(content);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getRefactoringImage = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let { id } = req.params;

  try {
    const folder = utils.getProjectFolder(project);
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/refactorings_sequence.json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);

    let arr = Array.from(jsonData["refactorings"]);

    let refactoring = utils.getRefactoring(id, service, arr, true);
    let ret = "";

    switch (refactoring["name"]) {
      case "BREAK DATA TYPE DEPENDENCY":
        ret = umls.createDataTypeDependencyUML(refactoring);
        break;
      case "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL":
        ret = umls.createChangeLocalMethodUML(refactoring);
        break;
      case "CHANGE DATA OWNERSHIP":
        ret = umls.createChangeDataOwnershipUML(refactoring);
        break;
      case "MOVE FOREIGN-KEY RELATIONSHIP TO CODE":
        ret = umls.createMoveForeignKeyUML(refactoring);
        break;
      case "CREATE DATA TRANSFER OBJECT":
        ret = umls.createDataTransferObjectUML(refactoring);
        break;
      case "FILE DEPENDENCY":
        ret = umls.createFileDependencyUML(refactoring);
      case "IMPORT DEPENDENCY":
        ret = umls.createImportDependencyUML(refactoring);
        break;
    }
   

    const f = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/refactorings/",
      "refactoring" + id + ".puml"
    );

    fs.writeFileSync(f, ret, { flag: "w" }, (err) => {
      if (err) {
        console.error(err);
      }
    });

    const filename = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/refactorings/" + "refactoring" + id + ".png" 
    );

    res.writeHead(200, {
      "Content-Type": "image/png",
    });
    const content = fs.readFileSync(filename, { encoding: "base64" });
    res.end(content);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};
