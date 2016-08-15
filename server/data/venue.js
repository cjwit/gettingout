var mongoose = require('mongoose');
var venueSchema = mongoose.Schema({
    yelpID: { type: String, required: true },
	going: { type: Array, required: true }
});

module.exports = mongoose.model('venue', venueSchema);
