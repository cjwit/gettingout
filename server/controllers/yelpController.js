var oauthSignature = require('oauth-signature');
var n = require('nonce')();
var request = require('request');
var qs = require('querystring');
var _ = require('lodash')
var router = require('express').Router();

router.route('/:location').get(getYelpListings);

var request_yelp = function(set_parameters, callback) {
	var httpMethod = 'GET';
	var url = 'http://api.yelp.com/v2/search';
	var default_parameters = {
		sort: '2',
		category_filter: 'bars'
	}
	var required_parameters = {
		oauth_consumer_key: process.env.CONSUMER_KEY,
		oauth_nonce: n(),
		oauth_signature_method: 'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now() / 1000), // n().toString().substr(0,10),
		oauth_token: process.env.TOKEN,
		oauth_version: '1.0'
	}

	var parameters = _.assign(default_parameters, set_parameters, required_parameters);
	var consumerSecret = process.env.CONSUMER_SECRET;
	var tokenSecret = process.env.TOKEN_SECRET;
	var signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret, { encodeSignature: false });
	parameters.oauth_signature = signature;
	var paramURL = qs.stringify(parameters);
	var apiURL = url + '?' + paramURL;
	request(apiURL, (error, response, body) => {
		return callback(error, response, body)
	})
}

function getYelpListings(req, res) {
	console.log('Yelp api called')
	var location = req.params.location;

	request_yelp({ location: location }, (err, result, body) => {
		if (err) { res.json(err) }
		var body = JSON.parse(body)
		var listings = [];
		body.businesses.map(listing => {
			listings.push({
				name: listing.name,
				yelpID: listing.id,
				url: listing.url,
				image: listing.image_url,
				address: listing.location.address,
				rating: listing.rating
			})
		})
		res.json(listings);
	});
}

module.exports = router;
