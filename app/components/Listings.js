import React, { PropTypes, Component } from 'react'
import Item from './Item.js'

export default class Listings extends Component {
	render() {
		const Items = [];
		this.props.listings.forEach((listing, i) => {
			let going = []
			this.props.selected.venues.forEach((venue) => {
				if (venue.yelpID == listing.yelpID) {
					venue.going.forEach((g) => {
						const today = new Date(Date.now()).toDateString();
						if (new Date(g.date).toDateString() == today) {
							going.push(g.username)
						}
					})
				}
			});
			Items.push(<Item
				key = { i }
				item = { listing }
				going = { going }
				amGoing = { going.indexOf(this.props.username) !== -1 }
				username = { this.props.username } />)
		})

		return (
			<div className = 'row'>
				{ Items }
			</div>
		)
	}
}

Listings.propTypes = {
	listings: PropTypes.array.isRequired,
	selected: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
}
