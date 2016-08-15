import React, { PropTypes, Component } from 'react'

export default class Item extends Component {
	updateSelected = (e) => {
		e.preventDefault();
		this.props.updateSelected(this.props.item.yelpID, this.props.user, this.props.amGoing)
	}

	render() {
		const button = <button className = { this.props.amGoing ? 'btn btn-default btn-xs btn-danger' : 'btn btn-default btn-xs btn-primary' } onClick = { this.updateSelected }>
			{ this.props.amGoing ? "I'm backing out" : "I'm going tonight" }
		</button>

		return (
			<li>{ this.props.item.name }
				<span className = 'going'> Going: { this.props.going.length } </span> { button }
			</li>
		)
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	going: PropTypes.array.isRequired,
	amGoing: PropTypes.bool.isRequired,
	user: PropTypes.string.isRequired
}
