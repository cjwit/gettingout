import React, { PropTypes, Component } from 'react'
import GoingButtonContainer from '../containers/GoingButtonContainer.js'

export default class Item extends Component {
	render() {
		return (
			<li>{ this.props.item.name }
				<span className = 'going'> Going: { this.props.going.length } </span>&nbsp;
				<GoingButtonContainer
					item = { this.props.item }
					user = { this.props.user }
					amGoing = { this.props.amGoing } />
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
