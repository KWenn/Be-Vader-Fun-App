var express = require('express')
    , cors = require('cors')
    , app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
var path = require('path');
app.use(express.static(path.join(__dirname, 'web')));
app.use(cors());
var player = require('play-sound')(opts = { timeout: 300 });

// respond with "hello world" when a GET request is made to the homepage


app.get('/', function(req, res){
        res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.post('/', function(req, res) {
	var URLS = req.body;
	var url = URLS["url"];
	player.play( __dirname + '/web/assets' + url, function(err){if (err) throw err});
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

