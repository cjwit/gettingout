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
    var venue = new Venue(_.extend({}, { yelpID: id, going: [ { username: user, date: Date.now() }] }));
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
	const update = { $set: { going: current.concat({ username: user, date: Date.now() }) }}
	Venue.update(query, update, (err) => {
		if (err) res.send(err);
		getVenues(null, res)
	})
}

function removeUser(id, current, index, res) {
	const query = { yelpID: id }
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
			var userIsGoing = false;
			var index;
			var today = new Date(Date.now()).toDateString();
			currentGoingArray.forEach((s, i) => {
				if (s.username == user && new Date(s.date).toDateString() == today) {
					userIsGoing = true;
					index = i;
				}
			})
			if (!userIsGoing) {
				addUser(id, currentGoingArray, user, res);
			} else {
				removeUser(id, currentGoingArray, index, res);
			}
		}
	})
}


module.exports = router;
