// Require external dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passport = require("passport");

// Require models
var model = require("./models/model.js");

// Require JS files
var util = require('./src/util.js');

// Require controllers
var indexController = require("./controllers/indexcontroller.js");
var appController = require("./controllers/appcontroller.js");


// Set middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/assets'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Config Passport
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  cb(null, user.email);
});

passport.deserializeUser(function(id, cb) {
  model.getUser(id).then(function(user) {
    cb(null, user);
  }).catch(function(err) {
    done(err, null)
  });
});

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  function(email, password, done) {
    model.getUserByCredentials(email, password).then(function(user) {
      if(!user) {
        return done("Incorrect Login Or Password");
      } else if (password != user.password) {
          return done("Incorrect login or password");
      } else {
        return done(null, user);
      }
    });
  }
));




// GET "/" and send index file

app.get("/", function(req, res, next) {
  res.set("Content-Type", "text/html");
  if(req.user) {
    res.send(req.user.email)
  } else {
    res.send(indexController.render())
  }
});

// GET "/login" and send login page

app.get("/login", function(req, res) {
  res.sendFile(__dirname + "/views/login/login.html");
});


// POST "/login" and authenticate user, then redirect
app.post("/login", passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
  res.redirect("/");
});

// GET "/logout" and destroy the user's session
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });


// Listen to port
app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8000, function (req, res) {
    util.log("[GRADUAL] Listening", "green");
});

module.exports.app = app;
