import React, { PropTypes, Component } from 'react'

export default class Item extends Component {
	state = {
		going: false
	}

	handleGoing = (e) => {
		this.setState({ going: !this.state.going })
		this.props.addGoing()
	}

	handleNotGoing = (e) => {
		e.preventDefault();
		this.setState({ going: !this.state.going })
		this.props.notGoing()
	}

	render() {
		var button = this.state.going ?
			<button className = 'btn btn-default btn-xs' onClick = { this.handleNotGoing }>I'm going</button>
			:
			<button className = 'btn btn-default btn-xs' onClick = { this.handleGoing }>Go!</button>


		return (
			<li>{ this.props.item.name }
				<span className = 'going'> Going: { this.props.going } </span> { button }
			</li>
		)
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	going: PropTypes.number.isRequired,
	user: PropTypes.string.isRequired
}
