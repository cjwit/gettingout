import { combineReducers } from 'redux'
import { LISTINGS_REQUEST, LISTINGS_RECEIVE, LISTINGS_INVALIDATE, LISTINGS_FAILURE,
		 CHANGE_LOCATION,
		 UPDATE_REQUEST, UPDATE_RECEIVE, UPDATE_FAILURE,
		 GET_SELECTED_REQUEST, GET_SELECTED_RECEIVE, GET_SELECTED_FAILURE,
		 GET_USER_REQUEST, GET_USER_RECEIVE, GET_USER_FAILURE,
	 	 LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
	 	 LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE,
	 	 REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE } from '../actions'

const initialState = {
	location: '',
	user: {
		isFetching: false,
		username: "",
		message: null
	},
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

function user(state, action) {
	switch(action.type) {
		case GET_USER_REQUEST:
		case LOGIN_REQUEST:
		case LOGOUT_REQUEST:
		case REGISTER_USER_REQUEST:
			return Object.assign({}, state, { isFetching: true })

		case GET_USER_RECEIVE:
		case LOGIN_SUCCESS:
		case REGISTER_USER_SUCCESS:
		case LOGOUT_SUCCESS:
			console.log('received user info', action.payload)
			const user = {
				username: action.payload.username,
				message: action.payload.message,
				isFetching: false
			}
			return user

		case GET_USER_FAILURE:
		case LOGIN_FAILURE:
		case REGISTER_USER_FAILURE:
		case LOGOUT_FAILURE:
			return state
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

		case GET_USER_REQUEST:
		case GET_USER_RECEIVE:
		case GET_USER_FAILURE:
		case LOGIN_REQUEST:
		case LOGIN_SUCCESS:
		case LOGIN_FAILURE:
		case REGISTER_USER_REQUEST:
		case REGISTER_USER_SUCCESS:
		case REGISTER_USER_FAILURE:
		case LOGOUT_REQUEST:
		case LOGOUT_SUCCESS:
		case LOGOUT_FAILURE:
			return Object.assign({}, state, {
				user: user(state.user, action)
			})

		default:
			return state
	}
}

export default reducer
