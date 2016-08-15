import React, { PropTypes, Component } from 'react'

export default class Item extends Component {
	state = {
		amGoing: this.props.going.indexOf(this.props.user) !== -1
	}

	updateSelected = (e) => {
		e.preventDefault();
		this.props.updateSelected(this.props.item.yelpID, this.props.user, this.state.amGoing)
		this.setState({ amGoing: !this.state.amGoing })
	}

	render() {
		const button = <button className = { this.state.amGoing ? 'btn btn-default btn-xs btn-danger' : 'btn btn-default btn-xs btn-primary' } onClick = { this.updateSelected }>
			{ this.state.amGoing ? "I'm backing out" : "I'm going tonight" }
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
	user: PropTypes.string.isRequired
}
