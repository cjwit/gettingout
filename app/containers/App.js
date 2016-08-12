import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { invalidateListings, fetchListingsIfNeeded, changeLocation } from '../actions'
import Listings from '../components/Listings'
import InputSubmit from '../components/InputSubmit'

class App extends Component {
	componentDidMount() {
		const { dispatch, location } = this.props

		// do not load anything at the outset
		// dispatch(fetchListingsIfNeeded(selectedSubreddit))
	}

	componentWillReceiveProps(nextProps) {
		console.log('### Receiving props')
		if (nextProps.location !== this.props.location) {
			const { dispatch, location } = nextProps
			console.log(' -- updating for', location)
			dispatch(fetchListingsIfNeeded(location))
		}
	}

	handleChange = (nextLocation) => {
		this.props.dispatch(changeLocation(nextLocation))
	}

	render() {
		const { location, listings, isFetching, lastUpdated, selected, user } = this.props
		return (
			<div>
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
					<h2>Empty</h2>
				}
				{ listings.length > 0 &&
					<div style = {{ opacity: isFetching ? 0.5 : 1 }} >
						<Listings listings = { listings } selected = { selected } user = { user } />
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
	console.log('### mapStateToProps')
	console.log(' -- state:')
	console.log(state)
	const location = state.location,
		  listings = state.listings.items,
		  isFetching = state.listings.isFetching,
		  lastUpdated = state.listings.lastUpdated,
		  user = state.user,
		  selected = state.selected;
	console.log(' -- props')
	console.log(location, listings, isFetching, lastUpdated, selected)
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
