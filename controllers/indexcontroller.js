var app = require("../index.js");
var renderindex = require("../src/renderindex.js");
var model = require("../models/model.js");

app.get("/", function(req, res) {
  res.set("Content-Type", "text/html");
  res.end(renderindex.render(""));
});
