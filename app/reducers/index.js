import { combineReducers } from 'redux'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS, INVALIDATE_LISTINGS, CHANGE_LOCATION } from '../actions'

const initialState = {
	location: 'Rochester, NY',
	listings: {
		isFetching: false,
		didInvalidate: false,
		lastUpdated: Date.now(),
		items: []
	}
}

function listingSegment(state, action) {
	switch (action.type) {
		case INVALIDATE_LISTINGS:
			return Object.assign({}, state, { didInvalidate: true })
		case REQUEST_LISTINGS:
			return Object.assign({}, state, { isFetching: true, didInvalidate: false })
		case RECEIVE_LISTINGS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.listings,
				lastUpdated: action.receivedAt })
		default:
			return state
	}
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case INVALIDATE_LISTINGS:
		case REQUEST_LISTINGS:
		case RECEIVE_LISTINGS:
			return Object.assign({}, state, {
				listings: listingSegment(state.listings, action)
			})
		case CHANGE_LOCATION:
			console.log('from reducer, location:', action.location)
			return Object.assign({}, state, {
				location: action.location
			})
		default:
			return state
	}
}

export default reducer
