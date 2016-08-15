import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { invalidateListings, fetchListingsIfNeeded, requestListingsAPI, changeLocation, getSelectedVenues } from '../actions'
import Listings from '../components/Listings'
import InputSubmit from '../components/InputSubmit'
import LoginContainer from './LoginContainer'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(getSelectedVenues())
	}

	componentWillReceiveProps(nextProps) {
		// console.log('### Receiving props for App')
		if (nextProps.location !== this.props.location) {
			const { dispatch, location } = nextProps
			dispatch(requestListingsAPI(location))
		}
	}

	handleChange = (nextLocation) => {
		this.props.dispatch(changeLocation(nextLocation))
	}

	render() {
		const { location, listings, isFetching, lastUpdated, selected, user } = this.props
		return (
			<div>
				<LoginContainer user = { this.props.user } />
				<h1>{ location }</h1>
				<InputSubmit name = 'locationInput'
						submitFunction = { this.handleChange }
						placeholder = 'Where are you?' />
				<p>
					{ lastUpdated &&
						<span>
							Last updated at { new Date(lastUpdated).toLocaleTimeString()}.
							{' '}
						</span>
					}
				</p>
				{ isFetching && listings.length === 0 &&
					<h2>Loading...</h2>
				}
				{ !isFetching && listings.length === 0 &&
					<h2>No results found.</h2>
				}
				{ listings.length > 0 &&
					<div style = {{ opacity: isFetching ? 0.5 : 1 }} >
						<Listings listings = { listings } selected = { selected } username = { user.username } />
					</div>
				}
			</div>
		)
	}
}

App.propTypes = {
	location: PropTypes.string.isRequired,
	listings: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	// console.log('### mapStateToProps')
	// console.log(' -- state:', state)
	const location = state.location,
		  listings = state.listings.items,
		  isFetching = state.listings.isFetching,
		  lastUpdated = state.listings.lastUpdated,
		  user = state.user,
		  selected = state.selected;
	// console.log(' -- props:', location, listings, isFetching, lastUpdated, selected)
	return {
		location,
		listings,
		isFetching,
		lastUpdated,
		selected,
		user
	}
}

export default connect(mapStateToProps)(App)
