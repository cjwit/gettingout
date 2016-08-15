// process.env requires PORT and DBURL
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compress = require('compression');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// controllers
var yelpController = require('./controllers/yelpController');
var venueController = require('./controllers/venueController');

var app = express();

app.use(compress());
app.use(express.static(path.join(__dirname, "../app/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/yelp', yelpController);
app.use('/venues', venueController);

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
