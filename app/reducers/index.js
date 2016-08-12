import { combineReducers } from 'redux'
import { REQUEST_LISTINGS,
		 RECEIVE_LISTINGS,
		 INVALIDATE_LISTINGS,
		 CHANGE_LOCATION,
		 GOING,
		 NOT_GOING } from '../actions'

const initialState = {
	location: '',
	user: 'chris',
	listings: {
		isFetching: false,
		didInvalidate: false,
		lastUpdated: Date.now(),
		items: []
	},
	selected: []
}

function listing(state, action) {
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

function selected(state, action) {
	switch (action.type) {
		case GOING:
			let inArray = false
			let goingState = state.map((listing) => listing)
			goingState.forEach((listing) => {
				if (listing.yelpID === action.yelpID) {
					listing.going++
					inArray = true
				}
			});
			if (!inArray) {
				goingState.push({ yelpID: action.yelpID, going: 1 })
			}
			return goingState

		case NOT_GOING:
			let notGoingState = state.map((listing) => listing)
			notGoingState.forEach((listing) => {
				if (listing.yelpID === action.yelpID) {
					listing.going--
				}
			});
			return notGoingState
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
				listings: listing(state.listings, action)
			})
		case CHANGE_LOCATION:
			console.log('from reducer, location:', action.location)
			return Object.assign({}, state, {
				location: action.location
			})
		case GOING:
		case NOT_GOING:
			return Object.assign({}, state, {
				selected: selected(state.selected, action)
			})
		default:
			return state
	}
}

export default reducer
