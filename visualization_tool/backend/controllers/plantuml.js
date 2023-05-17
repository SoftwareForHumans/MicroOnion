// const plantuml = require("node-plantuml");
const path = require("path");
const fs = require("fs");

exports.getPlantUmlPng = async (req, res) => {
  
  
  console.log("hello");
  res.set("Content-Type", "image/png");

  const jsonPath = path.join(__dirname, ".", "input-file.puml");
  // exec("puml generate uml.puml -o file.png", (error, stdout, stderr) => {
  //   if (error) {
  //     console.log(`error: ${error.message}`);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log(`stderr: ${stderr}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  // });
  // const data = fs.readFileSync(jsonPath, "utf8");
  // var gen = plantuml.generate(data);
  // gen.out.pipe(fs.createWriteStream("output-file.png"));
  // // compress(data)
  // let decode = plantuml.decode(data);
  // let gen = plantuml.generate("input-file");

  // // console.log(gen)
  // // decode.out.pipe(gen.in);
  // // gen.out.pipe(res);
  // gen.out.pipe(fs.createWriteStream("output-file.png"));
};

exports.getPlantUmlSvg = async (req, res) => {
  // res.set("Content-Type", "image/svg+xml");

  // let decode = plantuml.decode(req.params.uml);
  // let gen = plantuml.generate({ format: "svg" });

  // decode.out.pipe(gen.in);
  // gen.out.pipe(res);
};
