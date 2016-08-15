import React, { PropTypes, Component } from 'react'

export default class Item extends Component {
	state = {
		amGoing: this.props.going.indexOf(this.props.user) !== -1
	}

	updateSelected = (e) => {
		e.preventDefault();
		this.props.updateSelected(this.props.item.yelpID, this.props.user, this.state.amGoing)
	}

	render() {
		const button = <button className = 'btn btn-default btn-xs' onClick = { this.updateSelected }>
			Go!
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
