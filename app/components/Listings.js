import React, { PropTypes, Component } from 'react'
import Item from './Item.js'

export default class Listings extends Component {
	render() {
		const Items = [];
		this.props.listings.forEach((listing, i) => {
			let going = []
			this.props.selected.venues.forEach((venue) => {
				if (venue.yelpID == listing.yelpID) {
					going = venue.going
				}
			});
			Items.push(<Item
				key = { i }
				item = { listing }
				going = { going }
				amGoing = { going.indexOf(this.props.user) !== -1 }
				user = { this.props.user } />)
		})

		return (
			<ul>
				{ Items }
			</ul>
		)
	}
}

Listings.propTypes = {
	listings: PropTypes.array.isRequired,
	selected: PropTypes.object.isRequired,
	user: PropTypes.string.isRequired
}
