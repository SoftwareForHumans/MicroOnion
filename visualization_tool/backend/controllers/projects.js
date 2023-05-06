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
    console.log("hello")
  const { project } = req.params;
  let { service } = req.params;
  service = service.toString();
  const folder = getProjectFolder(project);
  

  try {
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
    response["from"] = jsonData[service];
    console.log(response)
    for (i in jsonData) {
      for (j in jsonData[i]) {
        if (j === service) {
          response["to"]= {[i]: jsonData[i][j]};
        }
      }
    }
    res.status(200).json(response);
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
