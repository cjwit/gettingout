import { CALL_API } from 'redux-api-middleware'

export const CHANGE_LOCATION = 'CHANGE_LOCATION'

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_RECEIVE = 'LISTINGS_RECEIVE'
export const LISTINGS_INVALIDATE = 'LISTINGS_INVALIDATE'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_RECEIVE = 'UPDATE_RECEIVE'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

export const GET_SELECTED_REQUEST = 'GET_SELECTED_REQUEST'
export const GET_SELECTED_RECEIVE = 'GET_SELECTED_RECEIVE'
export const GET_SELECTED_FAILURE = 'GET_SELECTED_FAILURE'

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
			types: [ LISTINGS_REQUEST, LISTINGS_RECEIVE, LISTINGS_FAILURE ]
		}
	}
}

// EDIT GOING... updateSelected(yelpID, user, going)
// use CALL_API with [CALL_API].body set to the id, user, and true/false (adding/subtracting)
// reducers should update state with the listing
export function updateSelected(yelpID, user, going) {
	return {
		[CALL_API]: {
			enpoint: `/venues/${yelpID}`,
			method: 'POST',
			body: JSON.stringify({ user, going }),
			types: [ UPDATE_REQUEST, UPDATE_RECEIVE, UPDATE_FAILURE ]
		}
	}
}

export function getSelectedVenues() {
	return {
		[CALL_API]: {
			enpoint: `/venues`,
			method: 'GET',
			types: [ GET_SELECTED_REQUEST, GET_SELECTED_RECEIVE, GET_SELECTED_FAILURE ]
		}
	}
}
