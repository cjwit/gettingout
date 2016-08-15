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
	console.log('addVenue called', venue)
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

function addUser(id, user) {

}

function removeUser(id, user) {
	// if, after removed, venue has no guests, deleteVenue

}

function updateSelected(req, res) {
	console.log('updateSelected called');
    var id = req.params.id;
    var user = req.body.user;
	var going = !!req.body.going;

	console.log(' -- info');
	console.log(id, user, going);
	Venue.find((err, venues) => {
		if (err) res.send(err);
		console.log(venues);
		var selectedIDs = [];
		venues.forEach((v) => selectedIDs.push(v.yelpID))
		if (selectedIDs.indexOf(id) == -1) {
			console.log('about to call addVenue')
			addVenue(id, user, res)
		}
		// check ids...
		// if venue is in list, addUser or removeUser
		// if venue does not exist, addVenue with user


	})

	// check current venues for a matching id
	// if there is one:
		// update the going list (find a good way to send this within the body)

/* from reducer logic

let inArray = false
let goingState = state.map((listing) => listing)
goingState.forEach((listing) => {
	if (listing.yelpID === action.yelpID) {
		listing.going++
		inArray = true
	}
});

// add item if it was not previously in selected
if (!inArray) {
	goingState.push({ yelpID: action.yelpID, going: 1 })
}

*/

/*
    var query = { _id: id },
        update = { $set: {
            name: info.name,
            location: info.location,
            description: info.description,
            date: new Date(info.date),
            tags: info.tags,
            contactName: info.contactName,
            contactEmail: info.contactEmail,
            edited: info.edited,
            editDate: info.editDate
        }};
    Event.update(query, update, function (err, updated) {
        if (err) res.send(err);
        else res.json(updated);
    });
*/

	// if the list drops to 0, call deleteVenue(id, res)
	// if not in the list, call addVenue(req, res)

}


module.exports = router;
