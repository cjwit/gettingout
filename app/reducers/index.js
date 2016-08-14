import { combineReducers } from 'redux'
import { LISTINGS_REQUEST, LISTINGS_RECEIVE, LISTINGS_INVALIDATE, LISTINGS_FAILURE,
		 CHANGE_LOCATION,
		 UPDATE_REQUEST, UPDATE_RECEIVE, UPDATE_FAILURE,
		 GET_SELECTED_REQUEST, GET_SELECTED_RECEIVE, GET_SELECTED_FAILURE } from '../actions'

const initialState = {
	location: '',
	user: 'chris',
	listings: {
		isFetching: false,
		didInvalidate: false,
		lastUpdated: Date.now(),
		items: []
	},
	selected: {
		isFetching: false,
		venues: []
	}
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
		case GET_SELECTED_REQUEST:
		case UPDATE_REQUEST:
			return Object.assign({}, state, { isFetching: true })

		case GET_SELECTED_RECEIVE:
		case UPDATE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				venues: action.payload })

		case GET_SELECTED_FAILURE:
		case UPDATE_FAILURE:
			return state

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
			
		case UPDATE_REQUEST:
		case UPDATE_RECEIVE:
		case UPDATE_FAILURE:
		case GET_SELECTED_REQUEST:
		case GET_SELECTED_RECEIVE:
		case GET_SELECTED_FAILURE:
			return Object.assign({}, state, {
				selected: selected(state.selected, action)
			})
		default:
			return state
	}
}

export default reducer
