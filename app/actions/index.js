import fetch from 'isomorphic-fetch'
import { config } from '../config.js'
/*
export function selectSubreddit(subreddit) {
	return {
		type: 'SELECT_SUBREDDIT',
		subreddit
	}
}
*/

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
	return {
		type: RECEIVE_LISTINGS,
		location,
		listings: json.body,
		receivedAt: new Date(Date.now())
	}
}

function fetchListings(location) {
	return dispatch => {
		dispatch(requestListings(location))
		return fetch(`/yelp/${location}`)
			.then(response => {
				console.log(response)
				return response
			})
			.then(response => dispatch(recieveListings(location, response)))
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
