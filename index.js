var express = require("express");
var app = express();
var util = require('./src/util.js');
var bodyParser = require("body-parser");
var indexController = require("./controllers/indexController.js");
var model = require("./models/model.js");
var LocalStrategy = require("passport-local");
var passport = require("passport");


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    model.getUser(username, password).then(function(user) {
      if(!user) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })
    model.getUser(username, password, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(id, cb) {
  model.getUser(id).then(function(user) {
    cb(null, user);
  });
});

app.get("/", function(req, res, next) {
  res.set("Content-Type", "text/html");
  if(req.user) {
    res.send(indexController.render())
  } else {
    res.send(indexController.render())
  }
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/views/login/login.html");
});

app.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect("/");
});

app.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000, process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1", function (req, res) {
    util.log("[GRADUAL] Listening", "green");
});

module.exports.app = app;
