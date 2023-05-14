const plantuml = require("node-plantuml");
const path = require("path");

exports.getPlantUmlPng = async (req, res) => {
  plantuml.useNailgun();
  console.log("hello")
  res.set("Content-Type", "image/png");
  const fs = require('fs');
  const jsonPath = path.join(
    __dirname,
    ".",
    "/uml.txt"
  );
  const data = fs.readFileSync(jsonPath, 'utf8');

  let decode = plantuml.decode(req.params.uml);
  let gen = plantuml.generate({ format: "png" });

  decode.out.pipe(gen.in);
  gen.out.pipe(res);
};

exports.getPlantUmlSvg = async (req, res) => {
  res.set("Content-Type", "image/svg+xml");

  let decode = plantuml.decode(req.params.uml);
  let gen = plantuml.generate({ format: "svg" });

  decode.out.pipe(gen.in);
  gen.out.pipe(res);
};
