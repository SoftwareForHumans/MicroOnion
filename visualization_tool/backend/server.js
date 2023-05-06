const express = require("express");
const cors = require("cors");
const app = express();
const plantUMLRouter = require('./routes/plantuml');
const projectsRouter = require('./routes/projects');
const path = require('path');
const port = 8000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use('/plantuml', plantUMLRouter); 
app.use('/projects', projectsRouter);
// error handler

  
  app.listen(port, () => {
    console.log(`Backend running on port: ${port}`);
  });
  
  module.exports = app;
  
