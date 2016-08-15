// process.env requires PORT and DBURL
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var compress = require('compression');
app.use(compress());

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// login
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(require('express-session')({
	secret: 'keyboard cat',
 	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../app/dist")));

// controllers
var yelpController = require('./controllers/yelpController');
var venueController = require('./controllers/venueController');
var userController = require('./controllers/userController');
app.use('/yelp', yelpController);
app.use('/venues', venueController);
app.use("/user", userController);

// passport config
var User = require('./data/user.js');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport requests
app.post('/register', function(req, res) {
	console.log('register called', req.body);
	User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
		if (err) {
			res.send(err);
		} else {
			res.json({ message: 'user created' });
		}
	});
});

app.get('/auth', function(req, res) {
	console.log('checking login status')
	if (req.user) {
		console.log('  -- user:', req.user.username, '\n');
		res.json(req.user.username);
	}
	else {
		console.log('  -- not logged in\n');
		res.send(false);
	}
})

app.post('/login',
	passport.authenticate('local'),
	function(req, res) {
		console.log('login called');
		console.log('  -- user from authenticate:', req.user.username, '\n');
		res.json(req.user.username);
	});

app.get('/logout', function(req, res) {
	console.log('logged out\n');
	req.logout();
	res.send(false);
});

// setup app
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("   Listening on port ", port, "...");
});

// connect to database
var dburl = process.env.DBURL;
mongoose.connect(dburl)
