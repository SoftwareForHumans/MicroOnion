const plantuml = require("node-plantuml");
plantuml.useNailgun(); // Activate the usage of Nailgun

exports.getPlantUmlPng = async (req, res) => {
  res.set("Content-Type", "image/png");

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
