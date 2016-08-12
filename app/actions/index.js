import fetch from 'isomorphic-fetch'

export const CHANGE_LOCATION = 'CHANGE_LOCATION'

export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'
export const INVALIDATE_LISTINGS = 'INVALIDATE_LISTINGS'

export const GOING = 'GOING'
export const NOT_GOING = 'NOT_GOING'

export function changeLocation(location) {
	return {
		type: CHANGE_LOCATION,
		location
	}
}

// FETCH LISTINGS
// is this ever called?
export function invalidateListings(location) {
	return {
		type: INVALIDATE_LISTINGS,
		location
	}
}

function requestListings(location) {
	return {
		type: REQUEST_LISTINGS,
		location
	}
}

function recieveListings(location, json) {
	return {
		type: RECEIVE_LISTINGS,
		listings: json,
		receivedAt: Date.now()
	}
}

function fetchListings(location) {
	return dispatch => {
		dispatch(requestListings(location))
		return fetch(`/yelp/${location}.json`)
			.then(response => response.json())
			.then(json => dispatch(recieveListings(location, json)))
			.catch(err => console.error("Caught Error:", err))
	}
}

function shouldFetchListings(state, location) {
	const listings = state.listings
	if (listings.items.length == 0) {
		return true
	} else if (listings.isFetching) {
		return false
	} else if (listings.didInvalidate) {
		return true
	} else {
		return true
	}
}

export function fetchListingsIfNeeded(location) {
	return (dispatch, getState) => {
		if (shouldFetchListings(getState(), location)) {
			return dispatch(fetchListings(location))
		} else {
			return Promise.resolve()
		}
	}
}

// EDIT GOING
export function addGoing(yelpID, user) {
	return {
		type: GOING,
		yelpID,
		user
	}
}

export function notGoing(yelpID, user) {
	return {
		type: NOT_GOING,
		yelpID,
		user
	}
}
