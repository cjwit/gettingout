var mongoose = require('mongoose');
var Venue = require('../data/venue');
var _ = require('underscore');

var router = require('express').Router();
router.route('/:id').post(updateSelected);
router.route('/').get(getVenues);

// get venues: call on initial load
// return all currently selected venues for state
function getVenues(req, res) {
	console.log('getVenues called')
	Venue.find(function (err, venues) {
        if (err) res.send(err);
        else res.json(venues);
    });
}

// called if no venue exists within the same name
function addVenue(id, user, res) {
    var venue = new Venue(_.extend({}, { yelpID: id, going: [ user ] }));
    venue.save(function (err) {
        if (err) res.send(err);
        getVenues(null, res);
    });
}

// called if no remaining people going to the venue
function deleteVenue(id, res) {
    Venue.remove({ _id: id }, function (err, removed) {
        if (err) res.send(err);
        else res.json(removed);
    });
}

function addUser(id, current, user, res) {
	const query = { yelpID: id }
	const update = { $set: { going: current.concat(user) }}
	Venue.update(query, update, (err) => {
		if (err) res.send(err);
		getVenues(null, res)
	})
}

function removeUser(id, current, user, res) {
	const query = { yelpID: id }
	const index = current.indexOf(user)
	current.splice(index, 1)
	if (current.length === 0) {
		Venue.remove(query, (err) => {
			if (err) res.send(err);
			getVenues(null, res);
		})
	} else {
		const update = { $set: { going: current }}
		Venue.update(query, update, (err) => {
			if (err) res.send(err);
			getVenues(null, res)
		})
	}
}

function updateSelected(req, res) {
    var id = req.params.id;
    var user = req.body.user;
	var going = !!req.body.going;
	var currentGoingArray;

	Venue.find((err, venues) => {
		if (err) res.send(err);
		var selectedIDs = [];
		venues.forEach((v) => {
			selectedIDs.push(v.yelpID)
			if (v.yelpID == id) {
				currentGoingArray = v.going;
			}
		})

		// no venue with this id is in selected, call function to add one
		if (selectedIDs.indexOf(id) == -1) {
			addVenue(id, user, res)

		// found a venue with this id, call function to update it
		} else {
			if (currentGoingArray.indexOf(user) == -1) {
				addUser(id, currentGoingArray, user, res);
			} else {
				removeUser(id, currentGoingArray, user, res);
			}
		}
	})
}


module.exports = router;
