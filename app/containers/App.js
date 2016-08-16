import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { invalidateListings,
		 fetchListingsIfNeeded,
		 requestListingsAPI,
		 changeLocation,
		 getSelectedVenues,
	 	 getUser } from '../actions'
import Listings from '../components/Listings'
import InputSubmit from '../components/InputSubmit'
import LoginContainer from './LoginContainer'

class App extends Component {
	componentDidMount() {
		this.props.dispatch(getSelectedVenues())
		this.props.dispatch(getUser())
	}

	componentWillReceiveProps(nextProps) {
		// console.log('### Receiving props for App')
		if (nextProps.location !== this.props.location) {
			const { dispatch, location } = nextProps
			dispatch(requestListingsAPI(location))
		}
	}

	handleChange = (nextLocation) => {
		$('#moving').animate({ 'margin-top': 20 })
		this.props.dispatch(changeLocation(nextLocation))
	}

	render() {
		const { location, listings, isFetching, selected, username } = this.props
		return (
			<div>
				<LoginContainer />
				<div id = 'moving'>
					<h1>{ location == "" ? "Where are you going tonight?" : location }</h1>
					<InputSubmit name = 'locationInput'
							submitFunction = { this.handleChange }
							placeholder = 'Where are you?' />
					{ isFetching && listings.length === 0 &&
						<h2>Search for local hotspots using yelp. Log in to pick one for yourself.</h2>
					}
					{ !isFetching && listings.length === 0 &&
						<h2>Search for local hotspots using yelp. Log in to pick one for yourself.</h2>
					}
				</div>
				{ listings.length > 0 &&
					<div style = {{ opacity: isFetching ? 0.5 : 1 }} >
						<Listings listings = { listings } selected = { selected } username = { username } />
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
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	// console.log('### mapStateToProps')
	// console.log(' -- state:', state)
	const location = state.location,
		  listings = state.listings.items,
		  isFetching = state.listings.isFetching,
		  username = state.user.username,
		  selected = state.selected;
	// console.log(' -- props:', location, listings, isFetching, lastUpdated, selected)
	return {
		location,
		listings,
		isFetching,
		selected,
		username
	}
}

export default connect(mapStateToProps)(App)
