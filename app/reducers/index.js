import { combineReducers } from 'redux'
import { LISTINGS_REQUEST,
		 LISTINGS_RECEIVE,
		 LISTINGS_INVALIDATE,
		 LISTINGS_FAILURE,
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
		case LISTINGS_INVALIDATE:
			return Object.assign({}, state, { didInvalidate: true })
		case LISTINGS_REQUEST:
			return Object.assign({}, state, { isFetching: true, didInvalidate: false })
		case LISTINGS_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.payload,
				lastUpdated: Date.now() })
		case LISTINGS_FAILURE:
			return state
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

			// add item if it was not previously in selected
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

			// remove items if no one is going
			return notGoingState.filter((listing) => listing.going > 0)

		default:
			return state
	}
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case LISTINGS_INVALIDATE:
		case LISTINGS_REQUEST:
		case LISTINGS_RECEIVE:
		case LISTINGS_FAILURE:
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
