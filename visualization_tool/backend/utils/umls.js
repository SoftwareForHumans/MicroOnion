const path = require("path");
const fs = require("fs");


function createDataTypeDependencyUML(ref) {
  console.log("BREAK DATA TYPE DEPENDENCY");
}

function createChangeLocalMethodUML(ref) {
  console.log("CHANGE LOCAL METHOD CALL DEPENDENCY");
  let res = "@startuml \nallow_mixing\nleft to right direction\n"
  res += "package \"" + ref["microservice"] + "\"{\n"
  res += "class " + ref["notes"]["requester"] + "\n"
  res += "class " + ref["notes"]["new_classes"][0] + "\n"
  res += "interface " + ref["notes"]["interfaces"][0] + "\n"
  res += "\n}\n"

  res += "package \"" + ref["dependent_microservice"] + "\"{\n"
  res += "class " + ref["notes"]["target"] + "\n"
  res += "class " + ref["notes"]["new_classes"][1] + "\n"
  res += "\n}\n"

  res += "\"" + ref["microservice"] + "\" ..> \"" + ref["dependent_microservice"] + "\":" + ref["notes"]["protocol"] + ":" + ref["notes"]["method"] + "\n";
 
  res += "@enduml"
  return res
}

function createChangeDataOwnershipUML(ref) {
  console.log("CHANGE DATA OWNERSHIP");
  return createMoveForeignKeyUML(ref["refactorings"][0])
}

function createMoveForeignKeyUML(ref) {
  console.log("MOVE FOREIGN-KEY REL");
  //todo: caso de não vir extamaente isto
  let res = "@startuml \nallow_mixing\nleft to right direction\n"
  res += "package \"" + ref["microservice"] + "\"{\n"
  res += "entity " + ref["notes"]["entities"][0] + "\n"
  res += "interface " + ref["notes"]["interfaces"][0] + "\n"
  res += "\n}\n"
  

  res += "package \"" + ref["dependent_microservice"] + "\"{\n"
  res += "entity " + ref["notes"]["entities"][1] + "\n"
  res += "interface " + ref["notes"]["interfaces"][1] + "\n"
  res += "\n}\n"

  res += "\"" + ref["microservice"] + "\" --x \"" + ref["dependent_microservice"] + "\":" + ref["notes"]["relationship"] + "\n"
  res += "\"" + ref["microservice"] + "\" ..> \"" + ref["dependent_microservice"] +"\"\n"
  res += "@enduml"
  return res;
}

function createDataTransferObjectUML(ref) {
  console.log("CREATE DATA TRANSFER OBJECT");
  let res = "@startuml \nallow_mixing\nleft to right direction\n"
  res += "package \"" + ref["microservice"] + "\"{\n"
  res += "entity " + ref["notes"]["created"] + "\n"
  res += "\n}\n"
  

  res += "package \"" + ref["dependent_microservice"] + "\"{\n"
  let parts = ref["notes"]["dependent"].split(".")
  let dep = parts.pop()
  res += "class " + dep + "\n"
  res += "}\n"

  res += "@enduml"
  return res;
}

function createFileDependencyUML(ref) {
  console.log("FILE DEPENDENCY");
}

function createImportDependencyUML(ref) {
  console.log("IMPORT DEPENDENCY");
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

module.exports = {
  createDataTypeDependencyUML,
  createChangeLocalMethodUML,
  createChangeDataOwnershipUML,
  createMoveForeignKeyUML,
  createDataTransferObjectUML,
  createFileDependencyUML,
  createImportDependencyUML,
  createInitialStateUML,
  createFinalStateUML,
};
