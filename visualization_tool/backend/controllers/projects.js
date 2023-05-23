const fs = require("fs");
const path = require("path");

exports.getProjects = async (req, res) => {
  res.status(200).send("hello");
};

exports.getRefactoringsSequence = async (req, res) => {
  const { name } = req.params;

  const folder = getProjectFolder(name);

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
      console.log(m);
      console.log("-------");
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

  try {
    service = service.toString();
    const folder = getProjectFolder(project);
    let response = {};
    const jsonPath = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/dependencies.json"
    );
    const data = fs.readFileSync(jsonPath, "utf8");
    let jsonData = JSON.parse(data);
    response["from"] = [];
    for (j in jsonData[service]) {
      response["from"].push([j, jsonData[service][j]]);
    }

    response["to"] = [];
    for (i in jsonData) {
      for (j in jsonData[i]) {
        if (j === service) {
          response["to"].push([i, jsonData[i][j]]);
        }
      }
    }
    console.log(response);
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
    const folder = getProjectFolder(project);
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

    console.log(response);

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getInitialState = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let {index} = req.params.project;

  try {
    service = service.toString();
    index = parseInt(index)

    const folder = getProjectFolder(project);
    const jsonPath2 = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot" + index + ".json"
    ); 

    const data2 = fs.readFileSync(jsonPath2, "utf8");
    let jsonData2 = JSON.parse(data2);
    initialState = jsonData2["services"];

    filename = createStateUML(project, service, true, initialState);
    res.sendFile(filename, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "trial.png");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

exports.getFinalState = async (req, res) => {
  const { project } = req.params;
  let { service } = req.params;
  let {index} = req.params;
  
  try {
    service = service.toString();
    index = parseInt(index)

    const folder = getProjectFolder(project);
    const jsonPath3 = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot" + (index + 1)  + ".json"
    );
    console.log(jsonPath3);

    const data3 = fs.readFileSync(jsonPath3, "utf8");
    let jsonData3 = JSON.parse(data3);
    finalState = jsonData3["services"];
    filename = createStateUML(project, service, false, finalState);

    res.sendFile(filename, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Sent:", "trial.png");
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
};

function getProjectFolder(name) {
  if (name.toLowerCase().includes("restaurant")) return "restaurantServer";
  else if (name.toLowerCase().includes("proyecto")) return "proyectoUNAM";
  else if (name.toLowerCase().includes("hotel")) return "hotelManagementSystem";
  else return "";
}

function createStateUML(project, service, initial, state) {
  res = "@startuml\n";
  for (let i in state) {
    if (state[i]["independent"]) {
      // console.log("hello")
    }
  }
  res += "@enduml";

  const filename = path.join(
    __dirname,
    "..",
    "files",
    project,
    "/umls/service" +
      service +
      (initial ? "_initial" : "_final") +
      "_state.puml"
  );
  fs.writeFileSync(filename, res, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  let f = path.join(__dirname, "trial.png");

  return f;
}
