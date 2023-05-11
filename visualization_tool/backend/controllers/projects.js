const fs = require("fs");
const path = require("path");

exports.getProjects = async (req, res) => {
  res.status(200).send();
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
  let response = {}

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

    jsonData["refactorings"].forEach(i => {
      counter++;
      if (i["microservice"] === parseInt(service) && i["name"] == "EXTRACT MICROSERVICE") {
        refactorings = i["refactorings"];
        return;
      }
    }); 
      
    response["sequence"] = refactorings;
    
    const jsonPath2 = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/snapshot"+ counter + ".json"
    );
    const data2 = fs.readFileSync(jsonPath2, "utf8");
    let jsonData2 = JSON.parse(data2);
    response["finalState"] = jsonData2["services"]

    console.log(response);
    res.status(200).json(response)
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
