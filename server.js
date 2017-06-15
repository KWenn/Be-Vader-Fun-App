const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
//const _ = require("lodash");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const player = require('play-sound')({ timeout: 300 });
const mongo = require('mongodb');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = '93T!ll!nf!n!ty';

//loads files in models dir
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//Configurations
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json

/**
 * Mongoose Connection
 */
mongoose.connect('mongodb://localhost/vader');
/**
 * Mongoose connections test
 */
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongooose connected");
});

//replace with users.js session.js
var Users = mongoose.model('users', {firstName: String, lastName: String, email: String, userName: String, password: String});


// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  Users.findOne({ id: jwt_payload.id}, function(err, user){
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
});
passport.use(strategy);

app.post("/api/login", function(req, res) {
  if(req.body.email && req.body.password){
    var email = req.body.email;
    var password = req.body.password;
  }
  // usually this would be a database call:
  Users.findOne({ email: email}, function(err, user){
    if( ! user ){
      res.status(401).json({message:"no such user found"});
    }

    if(user.password === req.body.password) {
      console.log("success");
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }
  });
});

app.get('/api/logout', passport.authenticate('jwt', { session: false }), function(req, res){
	deleteSession();
	res.redirect('/');
});


app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json("Success! You can not see this without a token");
});


app.listen(3000, function () {
  console.log('Vader is listening on port 3000!');
});
