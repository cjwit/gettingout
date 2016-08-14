import { CALL_API } from 'redux-api-middleware'

export const CHANGE_LOCATION = 'CHANGE_LOCATION'

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_RECEIVE = 'LISTINGS_RECEIVE'
export const LISTINGS_INVALIDATE = 'LISTINGS_INVALIDATE'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

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
		type: LISTINGS_INVALIDATE,
		location
	}
}

export function requestListingsAPI(location) {
	return {
		[CALL_API]: {
			endpoint: `/yelp/${location}`,
			method: 'GET',
			types: [ LISTINGS_REQUEST, LISTINGS_RECEIVE, LISTINGS_FAILURE]
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
