function getProjectFolder(name) {
  if (name.toLowerCase().includes("restaurant")) return "restaurantServer";
  else if (name.toLowerCase().includes("proyecto")) return "proyectoUNAM";
  else if (name.toLowerCase().includes("hotel")) return "hotelManagementSystem";
  else return "";
}

function getRefactoring(id, service, refactorings, first) {
  if (first) {
    for (let i in refactorings) {
      if (refactorings[i]["microservice"].toString() === service) {
        if (refactorings[i]["id"].toString() === id) return refactorings[i];
        return getRefactoring(
          id,
          service,
          refactorings[i]["refactorings"],
          false
        );
      }
    }
  }

  for (let i in refactorings) {
    if (refactorings[i]["id"].toString() === id) return refactorings[i];
  }
  for (let i in refactorings) {
    ret = getRefactoring(id, service, refactorings[i]["refactorings"], false);
    if (ret !== -1) return ret;
  }
  return -1;
}

module.exports = {
  getProjectFolder,
  getRefactoring,
};
