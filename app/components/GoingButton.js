import React, { PropTypes, Component } from 'react'

export default class GoingButton extends Component {
	updateSelected = (e) => {
		e.preventDefault();
		this.props.updateSelected(this.props.item.yelpID, this.props.username, this.props.amGoing)
	}

	render() {
		return (
			<button
				className = { this.props.amGoing ? 'btn btn-default btn-xs btn-danger' : 'btn btn-default btn-xs btn-primary' }
				onClick = { this.updateSelected }>
				{ this.props.amGoing ? "I'm backing out" : "I'm going tonight" }
			</button>
		)
	}
}

GoingButton.propTypes = {
	amGoing: PropTypes.bool.isRequired,
	item: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired
}
