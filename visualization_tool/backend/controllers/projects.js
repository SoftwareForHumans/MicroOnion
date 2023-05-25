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
  let { index } = req.params;

  try {
    service = service.toString();
    index = parseInt(index);

    const folder = getProjectFolder(project);
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
    createInitialStateUML(folder, service, initialState);

    const filename = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/service" + service + "_initial" + "_state.png" 
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

    const folder = getProjectFolder(project);
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
    createFinalStateUML(folder, service, finalState);

    const filename = path.join(
      __dirname,
      "..",
      "files",
      folder,
      "/umls/service" + service + "_final" + "_state.png"
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

function getProjectFolder(name) {
  if (name.toLowerCase().includes("restaurant")) return "restaurantServer";
  else if (name.toLowerCase().includes("proyecto")) return "proyectoUNAM";
  else if (name.toLowerCase().includes("hotel")) return "hotelManagementSystem";
  else return "";
}

function createFinalStateUML(project, service, state) {
  let res = "@startuml\n";
  let service_calls = "";
  let needed_classes = new Map();
  let dependents = [];
  let independents = [];

  // writing service - that was now extracted
  state.forEach((svc) => {
    if (svc["id"] === service) {
      res += 'package "' + svc["id"] + '"{\n';

      svc["files"].forEach((el) => {
        el = el.replace("'", "");
        idx = el.lastIndexOf(".") + 1;
        res += "class " + el.substring(idx) + "\n";
      });

      svc["new_classes"].forEach((el) => {
        res += "class " + el + "\n";
      });

      svc["interfaces"].forEach((el) => {
        res += "interface " + el + "\n";
      });
      svc["dtos"].forEach((el) => {
        res += "class " + el + "\n";
      });

      svc["service_calls"].forEach((el) => {
        cl = el["owner"].replace("'", "");
        idx = cl.lastIndexOf(".") + 1;
        service_calls +=
          '"' +
          service +
          '"..>' +
          '"' +
          el["target_service"] +
          '":' +
          cl.substring(idx) +
          ":" +
          el["target"] +
          "(" +
          el["protocol"] +
          ")\n";
        if (needed_classes.has(el["target_service"]))
          needed_classes.get(el["target_service"]).push(el["owner"]);
        else needed_classes.set(el["target_service"], [el["owner"]]);
      });

      res += "}\n";
    } else {
      if (svc["independent"]) independents.push(svc);
      else dependents.push(svc);
    }
  });

  let r; 
  // write independents
  independents.forEach((svc) => {
    [r, service_calls] = writeNotMainService(
      svc,
      needed_classes,
      service,
      service_calls
    );
    res += r;
  });

  // write dependents
  if (dependents.length > 0) res += 'package "Monolith" {\n';
  dependents.forEach((svc) => {
    [r, service_calls] = writeNotMainService(
      svc,
      needed_classes,
      service,
      service_calls
    );
    res += r;
  });

  if (dependents.length > 0) res += "}\n";

  res += service_calls;

  res += "@enduml";

  const filename = path.join(
    __dirname,
    "..",
    "files",
    project,
    "/umls/service" + service + "_final" + "_state.puml"
  );
  fs.writeFileSync(filename, res, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function createInitialStateUML(project, service, state) {
  let res = "@startuml\n";
  let dependencies = "";
  let needed_classes = new Map();
  let dependents = [];
  let independents = [];

  res += 'package "Monolith" {\n';

  state.forEach((svc) => {
    if (svc["id"] === service) {
      res += 'package "' + svc["id"] + '"{\n';

      svc["files"].forEach((el) => {
        el = el.replace("'", "");
        idx = el.lastIndexOf(".") + 1;
        res += "class " + el.substring(idx) + "\n";
      });

      const deps = new Map(Object.entries(svc["dependencies"]));
      for (let [key, value] of deps.entries()) {
        value = new Map(Object.entries(value));

        for (let [k, v] of value.entries()) {
          v.forEach((el) => {
            cl = el[0].replace("'", "");
            idx = cl.lastIndexOf(".") + 1;
            d = "";
            for (let i = 1; i < el.length; i++) {
              d += el[i];
              if (i !== el.length - 1) d += ", ";
            }
            dependencies +=
              '"' +
              service +
              '"-->' +
              '"' +
              key +
              '":' +
              cl.substring(idx) +
              ":" +
              d +
              "\n";

            if (needed_classes.has(key)) needed_classes.get(key).push(el[0]);
            else needed_classes.set(key, [el[0]]);
          });
        }
      }
      res += "}\n";
    } else {
      if (svc["independent"]) independents.push(svc);
      else dependents.push(svc);
    }
  });

  let r; 
  //write dependents
  dependents.forEach((svc) => {
    [r, dependencies] = writeNotMainInitial(
      svc,
      needed_classes,
      service,
      dependencies
    );
    res += r;
  });
  res += "}\n";

  //write independents
  independents.forEach((svc) => {
    [r, dependencies] = writeNotMainInitial(
      svc,
      needed_classes,
      service,
      dependencies
    );
    res += r;
  });

  res += dependencies;
  res += "@enduml";

  const filename = path.join(
    __dirname,
    "..",
    "files",
    project,
    "/umls/service" + service + "_initial" + "_state.puml"
  );
  fs.writeFileSync(filename, res, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

function writeNotMainService(svc, needed_classes, service, service_calls) {
  res = 'package "' + svc["id"] + '"{\n';
  if (needed_classes.has(svc["id"])) {
    needed_classes.get(svc["id"]).forEach((el) => {
      el = el.replace("'", "");
      idx = el.lastIndexOf(".") + 1;
      res += "class " + el.substring(idx) + "\n";
    });
  }

  svc["service_calls"].forEach((el) => {
    if (el["target_service"] === service) {
      cl = el["requester"].replace("'", "");
      idx = cl.lastIndexOf(".") + 1;
      res += "class " + cl.substring(idx) + "\n";

      cl = el["owner"].replace("'", "");
      idx = cl.lastIndexOf(".") + 1;

      service_calls +=
        '"' +
        svc["id"] +
        '"..>' +
        '"' +
        el["target_service"] +
        '":' +
        cl.substring(idx) +
        ":" +
        el["target"] +
        " (" +
        el["protocol"] +
        ")\n";
    }
  });
  res += "}\n";

  return [res, service_calls];
}

function writeNotMainInitial(svc, needed_classes, service, dependencies) {
  res = 'package "' + svc["id"] + '"{\n';
  if (needed_classes.has(svc["id"])) {
    needed_classes.get(svc["id"]).forEach((el) => {
      el = el.replace("'", "");
      idx = el.lastIndexOf(".") + 1;
      res += "class " + el.substring(idx) + "\n";
    });
  }

  const deps = new Map(Object.entries(svc["dependencies"]));
  for (let [key, value] of deps.entries()) {
    if (key === service) {
      value = new Map(Object.entries(value));

      for (let [k, v] of value.entries()) {
        v.forEach((el) => {
          cl = el[0].replace("'", "");
          idx = cl.lastIndexOf(".") + 1;
          d = "";
          for (let i = 1; i < el.length; i++) {
            d += el[i];
            if (i !== el.length - 1) d += ", ";
          }
          dependencies +=
            '"' +
            svc["id"] +
            '"-->' +
            '"' +
            key +
            '":' +
            cl.substring(idx) +
            ":" +
            d +
            "\n";
        });
      }
    }
  }
  res += "}\n";

  return [res, dependencies];
}
