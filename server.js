var express = require('express');
var cors = require('cors');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var player = require('play-sound')(opts = { timeout: 300 });
var mongo = require('mongodb');
//var session = require('express-session');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');


//connect to mongodb
mongoose.connect('mongodb://localhost/auth');
//mongodb schema
var Schema = mongoose.Schema;
var UserDetail = new Schema({
		username: String,
		password: String
    }, {
		collection: 'userInfo'
    });
var UserDetails = mongoose.model('userInfo', UserDetail);


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


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd',
    session: false
},
	function(username, password, done) {
    // ...
	}
));


app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
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
	res.json(req.body);
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


//mongodb connection test
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connected");
});

app.listen(3000, function () {
  console.log('Vader  listening on port 3000!');
});




//uv4l and webrtc for video


//stream video and audio to website from webcam/mic on raspberry pi
//create session - create a cue for users
//make session end after 3 minutes if somebody in cude
//display countdown and number of people in cue
//light up saber when user online
//make audio clips searchable using angular
//list audio clips by popularity

