// process.env requires PORT and DBURL
var express = require('express');
var path = require('path');
var compress = require('compression');
var oauthSignature = require('oauth-signature');
var n = require('nonce');
var request = require('request');
var qs = require('querystring');
var _ = require('lodash')

var app = express();

app.use(compress());
app.use(express.static(path.join(__dirname, "../app/dist")));

var request_yelp = function(set_parameters, callback) {
	var httpMethod = 'GET';
	var url = 'http://api.yelp.com/v2/search';
	var default_parameters = {
	//	sort: '2'
	}
	var required_parameters = {
		oauth_consumer_key: process.env.CONSUMER_KEY,
		oauth_nonce: n(),
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now() / 1000), // n().toString().substr(0,10),
		oauth_token: process.env.TOKEN,
		oauth_version: '1.0'
	}

	console.log('consumer key', required_parameters.oauth_consumer_key)
	console.log('token', required_parameters.oauth_token)
	console.log('timestamp', required_parameters.oauth_timestamp)

	var parameters = _.assign(default_parameters, set_parameters, required_parameters);

	console.log(parameters)

	var consumerSecret = process.env.CONSUMER_SECRET;
	var tokenSecret = process.env.TOKEN_SECRET;

	console.log('consumer secret', consumerSecret)
	console.log('token secret', tokenSecret)

	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });

	console.log('call for signature', httpMethod, url, parameters, consumerSecret, tokenSecret)
	parameters.oauth_signature = signature;

	console.log('oauth_signature', signature, parameters.oauth_signature)

	var paramURL = qs.stringify(parameters);
	var apiURL = url + '?' + paramURL;

	console.log('query url', apiURL)

	request(apiURL, (error, response, body) => {
		return callback(error, response, body)
	})
}

app.get('/yelp/:location', function(req, res) {
	console.log('api called')

	var location = req.params.location;
	var cb = function(err, res, body) { console.log(err, body) }

	request_yelp({ location: location }, cb);
})

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/index.html'));
})

// listen
var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("   Listening on port ", port, "...");
});
