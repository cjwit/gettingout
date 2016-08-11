import React, { PropTypes, Component } from 'react'

export default class Listings extends Component {
	render() {
		return (
			<ul>
				{ this.props.listings.map((listing, i) =>
					<li key = { i }>{ listing.name }</li>
				)}
			</ul>
		)
	}
}

Listings.propTypes = {
	listings: PropTypes.array.isRequired
}
