const path = require("path");
const fs = require("fs");

function createDataTypeDependencyUML(ref) {
  let sizeOfNewClasses = -1;
  let refactoring = null;

  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';
  res += "class " + ref["notes"]["file"] + "\n";
  if (ref["notes"]["interfaces"])
    res += "interface " + ref["notes"]["interfaces"] + "\n";

  if (ref["refactorings"]) {
    for (let i in ref["refactorings"]) {
      r = ref["refactorings"][i];
      if (r["name"] === "CREATE DATA TRANSFER OBJECT")
        if (r["notes"]["created"])
          res += "entity " + r["notes"]["created"] + "\n";

      if (
        r["name"] === "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL"
      ) {
        refactoring = r;

        if (r["notes"]["new_classes"]) {
          sizeOfNewClasses = r["notes"]["new_classes"].length;

          if (sizeOfNewClasses === 2)
            res += "class " + r["notes"]["new_classes"][0] + "\n";

          if (sizeOfNewClasses === 1)
            if (r["notes"]["new_classes"][0].includes("RequestInterfaceImpl"))
              res += "class " + r["notes"]["new_classes"][0] + "\n";
        }

        if (r["notes"]["interfaces"])
          res += "interface " + r["notes"]["interfaces"] + "\n";
      }
    }
  }
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';

  let parts = ref["notes"]["dependent_file"].split(".");
  let dep = parts.pop();
  res += "class " + dep + "\n";

  if (refactoring !== null) {
    if (refactoring["notes"]["new_classes"]) {
      if (sizeOfNewClasses === 2)
        res += "class " + refactoring["notes"]["new_classes"][1] + "\n";

      if (sizeOfNewClasses === 1)
        if (r["notes"]["new_classes"][0].includes("HandleRequest"))
          res += "class " + refactoring["notes"]["new_classes"][0] + "\n";
    }
  }
  res += "\n}\n";

  res +=
    '"' +
    ref["microservice"] +
    '" --x "' +
    ref["dependent_microservice"] +
    '":' +
    ref["notes"]["dependencies"] +
    "\n";

  if (refactoring !== null) {
    res +=
      '"' +
      ref["microservice"] +
      '" ..> "' +
      ref["dependent_microservice"] +
      '":' +
      refactoring["notes"]["protocol"] +
      ":" +
      refactoring["notes"]["method"] +
      "\n";
  }

  res += "@enduml";
  return res;
}

function createChangeLocalMethodUML(ref) {
  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';
  res = createChangeLocalMethodUMLRequester(ref, res);
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';
  res = createChangeLocalMethodUMLOwner(ref, res);

  res += "\n}\n";

  res = createChangeLocalMethodUMLServiceCall(ref, res);

  res += "@enduml";
  return res;
}

function createChangeLocalMethodUMLServiceCall(ref, res){
  res +=
    '"' +
    ref["microservice"] +
    '" ..> "' +
    ref["dependent_microservice"] +
    '":' +
    ref["notes"]["protocol"] +
    ":" +
    ref["notes"]["method"] +
    "\n";
  return res;
}

function createChangeLocalMethodUMLRequester(ref, res){
  res += "class " + ref["notes"]["requester"] + "\n";

  if (ref["notes"]["new_classes"]) {
    let sizeOfNewClasses = ref["notes"]["new_classes"].length;

    if (sizeOfNewClasses === 2)
      res += "class " + ref["notes"]["new_classes"][0] + "\n";

    if (sizeOfNewClasses === 1)
      if (ref["notes"]["new_classes"][0].includes("RequestInterfaceImpl"))
        res += "class " + ref["notes"]["new_classes"][0] + "\n";
  }

  if (ref["notes"]["interfaces"])
    res += "interface " + ref["notes"]["interfaces"][0] + "\n";
  return res;
}

function createChangeLocalMethodUMLOwner(ref, res){
  res += "class " + ref["notes"]["target"] + "\n";
  if (sizeOfNewClasses === 2)
    res += "class " + ref["notes"]["new_classes"][1] + "\n";

  if (sizeOfNewClasses === 1)
    if (ref["notes"]["new_classes"][0].includes("HandleRequest"))
      res += "class " + ref["notes"]["new_classes"][0] + "\n";
  
  return res;
}

function createChangeDataOwnershipUML(ref) {
  return createMoveForeignKeyUML(ref["refactorings"][0]);
}

function createMoveForeignKeyUML(ref) {
  let r = null;
  if(ref["refactorings"]){
    for (let i in ref["refactorings"])
      if (ref["refactorings"][i]["name"] === "CHANGE LOCAL METHOD CALL DEPENDENCY TO A SERVICE CALL")
        r = ref["refactorings"][i];
  }

  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';
  res += "entity " + ref["notes"]["entities"][0] + "\n";
  if (ref["notes"]["interfaces"]) {
    if (ref["notes"]["interfaces"].length === 2)
      res += "interface " + ref["notes"]["interfaces"][0] + "\n";
    if (ref["notes"]["interfaces"].length === 1)
      if (ref["notes"]["interfaces"][0].includes(ref["notes"]["entities"][0]))
        res += "interface " + ref["notes"]["interfaces"][0] + "\n";
  }
  if(r !== null)
    res = createChangeLocalMethodUMLRequester(r, res);
  
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';
  res += "entity " + ref["notes"]["entities"][1] + "\n";
  if (ref["notes"]["interfaces"]) {
    if (ref["notes"]["interfaces"].length === 2)
      res += "interface " + ref["notes"]["interfaces"][1] + "\n";
    if (ref["notes"]["interfaces"].length === 1)
      if (ref["notes"]["interfaces"][0].includes(ref["notes"]["entities"][1]))
        res += "interface " + ref["notes"]["interfaces"][0] + "\n";
  }
  if(r !== null)
    res = createChangeLocalMethodUMLOwner(r, res);
  
  res += "\n}\n";

  res +=
    '"' +
    ref["microservice"] +
    '" --x "' +
    ref["dependent_microservice"] +
    '":' +
    ref["notes"]["relationship"] +
    "\n";
  res +=
    '"' +
    ref["microservice"] +
    '" ..> "' +
    ref["dependent_microservice"] +
    '"\n';
  if(r !== null)
    res = createChangeLocalMethodUMLServiceCall(r, res);
  res += "@enduml";
  return res;
}

function createDataTransferObjectUML(ref) {
  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';
  if (ref["notes"]["created"])
    res += "entity " + ref["notes"]["created"] + "\n";
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';
  let parts = ref["notes"]["dependent"].split(".");
  let dep = parts.pop();
  res += "class " + dep + "\n";
  res += "}\n";

  res += "@enduml";
  return res;
}

function createFileDependencyUML(ref) {
  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';

  if (ref["notes"]["interfaces"])
    res += "interace " + ref["notes"]["interfaces"] + "\n";
  else if (ref["notes"]["new_classes"])
    res += "class " + ref["notes"]["new_classes"] + "\n";
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';
  if (ref["notes"]["interfaces"])
    res += "interace " + ref["notes"]["interfaces"] + "\n";
  else if (ref["notes"]["new_classes"])
    res += "class " + ref["notes"]["new_classes"] + "\n";
  res += "}\n";

  res += "@enduml";
  return res;
}

function createImportDependencyUML(ref) {
  let res = "@startuml \nallow_mixing\nleft to right direction\n";
  res += 'package "' + ref["microservice"] + '"{\n';
  res += "class " + ref["notes"]["new_classes"] + "\n";
  res += "\n}\n";

  res += 'package "' + ref["dependent_microservice"] + '"{\n';
  res += "class " + ref["notes"]["new_classes"] + "\n";
  res += "}\n";

  res += "@enduml";
  return res;
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
      res = writeFiles(svc["files"], res, true);
      res = writeFiles(svc["new_classes"], res, false);
      res = writeInterfaces(svc["interfaces"], res);
      res = writeFiles(svc["dtos"], res, false);

      [res, service_calls, needed_classes] = writeServiceCalls(
        svc["service_calls"],
        service,
        svc["id"],
        service_calls,
        res,
        needed_classes
      );

      res += "}\n";
    } else {
      if (svc["independent"]) independents.push(svc);
      else dependents.push(svc);
    }
  });

  // write independents
  [res, service_calls] = writeOtherServices(
    independents,
    needed_classes,
    service,
    service_calls,
    false,
    res
  );

  // write dependents
  if (dependents.length > 0) res += 'package "Monolith" {\n';
  [res, service_calls] = writeOtherServices(
    dependents,
    needed_classes,
    service,
    service_calls,
    false,
    res
  );

  if (dependents.length > 0) res += "}\n";

  res += service_calls;

  res += "@enduml";

  saveToFile(project, service, res, false);
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

      res = writeFiles(svc["files"], res, true);

      [dependencies, needed_classes] = writeDependencies(
        svc["dependencies"],
        service,
        svc["id"],
        dependencies,
        needed_classes
      );

      res += "}\n";
    } else {
      if (svc["independent"]) independents.push(svc);
      else dependents.push(svc);
    }
  });

  //write dependents
  [res, dependencies] = writeOtherServices(
    dependents,
    needed_classes,
    service,
    dependencies,
    true,
    res
  );
  res += "}\n";

  //write independents
  [res, dependencies] = writeOtherServices(
    independents,
    needed_classes,
    service,
    dependencies,
    true,
    res
  );

  res += dependencies;
  res += "@enduml";

  saveToFile(project, service, res, true);
}

function writeOtherServices(
  services,
  needed_classes,
  service,
  info,
  initial = true,
  res
) {
  let r;
  if (services.length)
    services.forEach((svc) => {
      [r, info] = writeEachOtherServices(
        svc,
        needed_classes,
        service,
        info,
        initial
      );
      res += r;
    });

  return [res, info];
}

function writeEachOtherServices(
  svc,
  needed_classes,
  service,
  info,
  initial = true
) {
  res = 'package "' + svc["id"] + '"{\n';
  if (needed_classes.has(svc["id"])) {
    needed_classes.get(svc["id"]).forEach((el) => {
      el = el.replace("'", "");
      idx = el.lastIndexOf(".") + 1;
      res += "class " + el.substring(idx) + "\n";
    });
  }

  if (initial)
    [info, _] = writeDependencies(
      svc["dependencies"],
      service,
      svc["id"],
      info
    );
  else
    [res, info, _] = writeServiceCalls(
      svc["service_calls"],
      service,
      svc["id"],
      info,
      res
    );

  res += "}\n";
  return [res, info];
}

function writeFiles(files, res, needsSub) {
  files.forEach((el) => {
    if (needsSub) {
      el = el.replace("'", "");
      let idx = el.lastIndexOf(".") + 1;
      res += "class " + el.substring(idx) + "\n";
    } else res += "class " + el + "\n";
  });
  return res;
}

function writeInterfaces(interfaces, res) {
  interfaces.forEach((el) => {
    res += "interface " + el + "\n";
  });
  return res;
}

function writeServiceCalls(
  service_calls,
  service,
  id,
  calls,
  res,
  needed_classes = null
) {
  service_calls.forEach((el) => {
    if (needed_classes !== null || el["target_service"] === service) {
      //the different cases where this function is called that are mutually exclusive
      if (needed_classes === null) {
        let cl = el["requester"].replace("'", "");
        let idx = cl.lastIndexOf(".") + 1;
        res += "class " + cl.substring(idx) + "\n";
      }

      cl = el["owner"].replace("'", "");
      idx = cl.lastIndexOf(".") + 1;

      calls +=
        '"' +
        id +
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
      if (needed_classes !== null)
        if (needed_classes.has(el["target_service"]))
          needed_classes.get(el["target_service"]).push(el["owner"]);
        else needed_classes.set(el["target_service"], [el["owner"]]);
    }
  });
  return [res, calls, needed_classes];
}

function writeDependencies(
  svc_dependencies,
  service,
  id,
  dependencies,
  needed_classes = null
) {
  const deps = new Map(Object.entries(svc_dependencies));
  for (let [key, value] of deps.entries()) {
    if (needed_classes !== null || key === service) {
      //the different cases where this function is called that are mutually exclusive
      value = new Map(Object.entries(value));

      for (let [_, v] of value.entries()) {
        v.forEach((el) => {
          let cl = el[0].replace("'", "");
          let idx = cl.lastIndexOf(".") + 1;
          let d = "";
          for (let i = 1; i < el.length; i++) {
            d += el[i];
            if (i !== el.length - 1) d += ", ";
          }
          dependencies +=
            '"' +
            id +
            '"-->' +
            '"' +
            key +
            '":' +
            cl.substring(idx) +
            ":" +
            d +
            "\n";

          if (needed_classes !== null) {
            if (needed_classes.has(key)) needed_classes.get(key).push(el[0]);
            else needed_classes.set(key, [el[0]]);
          }
        });
      }
    }
  }
  return [dependencies, needed_classes];
}

function saveToFile(project, service, res, initial = true) {
  const filename = path.join(
    __dirname,
    "..",
    "files",
    project,
    "/umls/states/service" +
      service +
      (initial ? "_initial" : "_final") +
      "_state.puml"
  );
  fs.writeFileSync(filename, res, { flag: "w" }, (err) => {
    if (err) {
      console.error(err);
    }
  });
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
