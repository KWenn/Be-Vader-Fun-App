/**
 * Module dependencies.
 */

const express = require('express');
const cors = require('cors');
const http = require('http');

const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const player = require('play-sound')(opts = { timeout: 300 });
const mongo = require('mongodb');
//const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('client-sessions');
const app = express();


/**
 * Middleware functions
 */

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


//Configurations
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');


/**
 * Mongoose Connection
 */

mongoose.connect('mongodb://localhost/auth');
//mongodb schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var userSchema = new Schema({
		first_name: String,
		last_name: String,
		email: String,
		username: String,
		auth: String
    });
    
var Users = mongoose.model('Users', userSchema);


//Authentication
passport.use(new LocalStrategy(function(username, password, done) {
	process.nextTick(function() {
    	UserDetails.findOne({
			'username': username, 
    	}, function(err, user) {
			if (err) { return done(err);}
	  		if (!user) { return done(null, false);}	
	  		if (user.password != password) { return done(null, false);}
	  	return done(null, user);
    	});
  	});
}));
passport.use(new LocalStrategy({
    usernameField: 'email',
    firstName: 'firstname',
    lastName: 'lastname',
    passwordField: 'passwd',
    session: false
},
	function(username, password, done) {
    // ...
	}
));



//Routes

app.get('/', function(req, res){
    res.render('index.html');
});

app.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/loginFailure' }),
	function(req, res) {
    	res.redirect('/');
});

app.get('/loginSuccess', function(req, res){
	res.send("Successfully logged in");
});

app.get('/loginFailure', function(req, res){
	res.send("Failure to logged in");
});

app.get('/logout', function(req, res){
	res.redirect('/');
});

app.get('/register', function(req, res){
	res.sendFile(path.join(__dirname + '/public/register.html'));
});

app.post('/register', function(req, res){
	
	//console.log(req.body);

	var userName = req.body.userName;
	var firstName = req.body.firstName;
	var lastName = req.body.lastName;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	//validation
	req.checkBody('firstName', 'First Name is required').notEmpty();
	req.checkBody('lastName', 'Last Name is required').notEmpty();
	req.checkBody('email', 'email is required').notEmpty();
	req.checkBody('password', 'Password required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);	
	
	var errors = req.validationErrors();
	if(errors){
		res.send(errors[0].msg);
	}else{
		res.send(false);
		//session start code
			//if passwords match and requirements are met, hash password here
		if(password===password2){
			bcrypt.hash(password, 10, function(err, hash) {
				// Store hash in database
			})
		}
	}
	//res.json(req.body);
	
	Users.find({}, function(err,users){
		if (err) throw err;
		console.log(users);
	})	
});

/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/

app.post('/', function(req, res) {
	var URLS = req.body;
	var url = URLS["url"];
	console.log(url);
	player.play( __dirname + '/public/assets/soundclips/' + url + '.mp3', function(err){if (err) throw err});
    res.status(200).send((url).toString());
});




/**
 * Mongoose connections test
 */

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("mongooose connected");
});

process.on('exit', function(code) {
mongoose.disconnect();
});


/**
 * Model Logic
 */

function find(collec, query, callback) {
    mongoose.connection.db.collection(collec, function (err, collection) {
    collection.find(query).toArray(callback);
    });
}



/**
 * App Logic
 */

function checkpassword(pwtest, pwhash){
	bcrypt.compare(pwtest, pwhash, function(err, res) {
		if(res) {
		// Passwords match - returns true
		//console.log("Matches=>" + res);
		//create session variable
		req.session.user = user;  //loads cookie
  		} else {
  		// Passwords don't match -returns false
  		//console.log("Dont Match=>" + res);
  		
  		} 
	});
}


/**
 * Express Connection
 */

app.listen(3000, function () {
  console.log('Vader  listening on port 3000!');
});



/**
 * To Do's
 */


//uv4l and webrtc for video
//stream video and audio to website from webcam/mic on raspberry pi
//create session - create a cue for users
//make session end after 3 minutes if somebody in cude
//display countdown and number of people in cue
//light up saber when user online
//make audio clips searchable using angular
//list audio clips by popularity

