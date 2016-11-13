var express = require('express')
    , cors = require('cors')
    , app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');
var player = require('play-sound')(opts = { timeout: 300 });
//var test = require('./sockets/base')(io);


app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/dashboard/' + req.user.username);
});

app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/dashboard', function(req, res){
        res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});


io.on('connection', function(socket){
  console.log('a user connected');
});

app.post('/', function(req, res) {
	var URLS = req.body;
	var url = URLS["url"];
	console.log(url);
	player.play( __dirname + '/public/assets/soundclips/' + url + '.mp3', function(err){if (err) throw err});
    res.status(200).send((url).toString());
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

