import React, { PropTypes, Component } from 'react'
import ItemContainer from '../containers/ItemContainer.js'

export default class Listings extends Component {
	render() {
		const ItemContainers = [];
		this.props.listings.forEach((listing, i) => {
			let going = []
			this.props.selected.venues.forEach((venue) => {
				if (venue.yelpID == listing.yelpID) {
					going = venue.going
				}
			});
			ItemContainers.push(<ItemContainer key = { i } item = { listing } going = { going } user = { this.props.user } />)
		})

		return (
			<ul>
				{ ItemContainers }
			</ul>
		)
	}
}

Listings.propTypes = {
	listings: PropTypes.array.isRequired,
	selected: PropTypes.object.isRequired,
	user: PropTypes.string.isRequired
}
