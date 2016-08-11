import { combineReducers } from 'redux'
import { REQUEST_LISTINGS, RECEIVE_LISTINGS, INVALIDATE_LISTINGS } from '../actions'

/* LOGIN logic here
function selectedSubreddit(state = 'frontend', action) {
	switch (action.type) {
		case 'SELECT_SUBREDDIT':
			return action.subreddit
		default:
			return state
	}
}
*/

function listings(state = {
	isFetching: false,
	didInvalidate: false,
	items: []
}, action) {
	switch (action.type) {
		case INVALIDATE_LISTINGS:
			return Object.assign({}, state, { didInvalidate: true })
		case REQUEST_LISTINGS:
			return Object.assign({}, state, { isFetching: true, didInvalidate: false })
		case RECEIVE_LISTINGS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				location: action.location,
				items: action.listings,
				lastUpdated: action.receivedAt })
		default:
			return state
	}
}

function listingsFromYelp(state = {}, action) {
	switch (action.type) {
		case INVALIDATE_LISTINGS:
		case REQUEST_LISTINGS:
		case RECEIVE_LISTINGS:
			return Object.assign({}, state, {
				listings: listings(state.listings, action)
			})
		default:
			return state
	}
}

const rootReducer = combineReducers({
	listingsFromYelp
})

export default rootReducer
