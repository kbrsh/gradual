var express = require("express");
var app = express();
var util = require('./src/util.js');
var bodyParser = require("body-parser");
var session = require("express-session");
var renderIndex = require("./src/renderindex.js");
var model = require("./models/model.js");
var everyauth = require('everyauth');
var cookieParser = require("cookieParser");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));
app.use(cookieParser('mr ripley'))
app.use(session())
app.use(everyauth.middleware(app));

app.get("/", function(req, res, next) {
  res.set("Content-Type", "text/html");
  console.log(req.session);
  if(req.session.user) {
    res.send(renderIndex.render(req.session.user.username))
  } else {
    res.send(renderIndex.render(""))
  }
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/views/login/login.html");
});

app.post("/login", function(req, res) {
  model.getUser(req.body.username, req.body.password).then(function(user) {
    if(user) {

    } else {
      res.redirect("/");
    }
  });
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function (req, res) {
    util.log("[GRADUAL] Listening", "green");
});

module.exports.app = app;
