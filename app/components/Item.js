import React, { PropTypes, Component } from 'react'

export default class Item extends Component {
	render() {
		return (
			<li>{ this.props.item.name }
				<span className = 'going'> Going: { this.props.going } </span>
				<button className = 'btn btn-default btn-xs' onClick = { this.props.addGoing }>Go!</button> 
				<button className = 'btn btn-default btn-xs' onClick = { this.props.notGoing }>Leave!</button>
			</li>
		)
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	going: PropTypes.number.isRequired,
	user: PropTypes.string.isRequired
}
