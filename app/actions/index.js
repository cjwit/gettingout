import fetch from 'isomorphic-fetch'

export const REQUEST_LISTINGS = 'REQUEST_LISTINGS'
export const RECEIVE_LISTINGS = 'RECEIVE_LISTINGS'
export const INVALIDATE_LISTINGS = 'INVALIDATE_LISTINGS'

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
	console.log('  -- recieved listings', json)
	return {
		type: RECEIVE_LISTINGS,
		location,
		listings: json,
		receivedAt: new Date(Date.now())
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
	if (!listings) {
		return true
	} else if (listings.isFetching) {
		return false
	} else {
		return listings.didInvalidate
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
