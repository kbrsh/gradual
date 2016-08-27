var express = require("express");
var app = express();
var util = require('./src/util.js');
var bodyParser = require("body-parser");
var renderindex = require("../src/renderindex.js");
var model = require("../models/model.js");



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));


app.get("/", function(req, res) {
  res.set("Content-Type", "text/html");
  res.end(renderindex.render(""));
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function (req, res) {
    util.log("[GRADUAL] Listening", "green");
});

module.exports.app = app;
