import { CALL_API } from 'redux-api-middleware'

export const CHANGE_LOCATION = 'CHANGE_LOCATION'

export function changeLocation(location) {
	return {
		type: CHANGE_LOCATION,
		location
	}
}

// FETCH LISTINGS
// is this ever called?
export const LISTINGS_INVALIDATE = 'LISTINGS_INVALIDATE'

export function invalidateListings(location) {
	return {
		type: LISTINGS_INVALIDATE,
		location
	}
}

export const LISTINGS_REQUEST = 'LISTINGS_REQUEST'
export const LISTINGS_RECEIVE = 'LISTINGS_RECEIVE'
export const LISTINGS_FAILURE = 'LISTINGS_FAILURE'

export function requestListingsAPI(location) {
	return {
		[CALL_API]: {
			endpoint: `/yelp/${location}`,
			method: 'GET',
			types: [ LISTINGS_REQUEST, LISTINGS_RECEIVE, LISTINGS_FAILURE ]
		}
	}
}

export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_RECEIVE = 'UPDATE_RECEIVE'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

export function updateSelected(yelpID, user, going) {
	return {
		[CALL_API]: {
			endpoint: `/venues/${yelpID}`,
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ user, going }),
			types: [ UPDATE_REQUEST, UPDATE_RECEIVE, UPDATE_FAILURE ]
		}
	}
}

export const GET_SELECTED_REQUEST = 'GET_SELECTED_REQUEST'
export const GET_SELECTED_RECEIVE = 'GET_SELECTED_RECEIVE'
export const GET_SELECTED_FAILURE = 'GET_SELECTED_FAILURE'

export function getSelectedVenues() {
	return {
		[CALL_API]: {
			endpoint: `/venues`,
			method: 'GET',
			types: [ GET_SELECTED_REQUEST, GET_SELECTED_RECEIVE, GET_SELECTED_FAILURE ]
		}
	}
}

export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_RECEIVE = 'GET_USER_RECEIVE'
export const GET_USER_FAILURE = 'GET_USER_FAILURE'

export function getUser() {
	return {
		[CALL_API]: {
			endpoint: `/auth`,
			method: 'GET',
			types: [ GET_USER_REQUEST, GET_USER_RECEIVE, GET_USER_FAILURE ]
		}
	}
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function login(user) {
	return {
		[CALL_API]: {
			endpoint: `/login`,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(user),
			types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ]
		}
	}
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function logout() {
	return {
		[CALL_API]: {
			endpoint: `/logout`,
			method: 'GET',
			types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ]
		}
	}
}

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE'

export function register(user) {
	return {
		[CALL_API]: {
			endpoint: `/register`,
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(user),
			types: [ REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE ]
		}
	}
}
