import React, { PropTypes, Component } from 'react'
import ItemContainer from '../containers/ItemContainer.js'

export default class Listings extends Component {
	render() {
		return (
			<ul>
				{ this.props.listings.map((listing, i) => {
					let going = 0;
					this.props.selected.map((s) => {
						if (s.yelpID == listing.yelpID) { going += s.going }
					})
					return <ItemContainer key = { i } item = { listing } going = { going } user = { this.props.user } />
				}) }
			</ul>
		)
	}
}

Listings.propTypes = {
	listings: PropTypes.array.isRequired,
	selected: PropTypes.array.isRequired,
	user: PropTypes.string.isRequired
}
