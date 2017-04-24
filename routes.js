const routes = require('express').Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
routes.use(express.static(path.join(__dirname, 'public')));


//Gets

routes.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

routes.get('/dashboard', function(req, res){
    res.sendFile(path.join(__dirname + '/public/dashboard.html'));
});

routes.get('/loginSuccess', function(req, res){
	res.send("Successfully logged in");
});

routes.get('/loginFailure', function(req, res){
	res.send("Failure to logged in");
});

routes.get('/logout', function(req, res){
	res.redirect('/');
});

routes.get('/register', function(req, res){
	res.sendFile(path.join(__dirname + '/public/register.html'));
});


//Posts

routes.post('/login', passport.authenticate('local', { failureRedirect: '/loginFailure' }),
	function(req, res) {
    	res.redirect('/');
});

routes.post('/register', function(req, res){
	res.json(req.body);
});

/*
io.on('connection', function(socket){
  console.log('a user connected');
});
*/

routes.post('/', function(req, res) {
	var URLS = req.body;
	var url = URLS["url"];
	console.log(url);
	player.play( __dirname + '/public/assets/soundclips/' + url + '.mp3', function(err){if (err) throw err});
    res.status(200).send((url).toString());
});



module.exports = routes;
