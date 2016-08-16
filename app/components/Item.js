import React, { PropTypes, Component } from 'react'
import GoingButtonContainer from '../containers/GoingButtonContainer.js'

export default class Item extends Component {
	render() {
		return (
			<li>{ this.props.item.name }
				<span className = 'going'> Going: { this.props.going.length } </span>&nbsp;
				<GoingButtonContainer
					item = { this.props.item }
					username = { this.props.username }
					amGoing = { this.props.amGoing } />
				{ this.props.going.map((user) => " " + user ) }
			</li>
		)
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	going: PropTypes.array.isRequired,
	amGoing: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired
}
