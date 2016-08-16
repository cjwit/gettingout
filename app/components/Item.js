import React, { PropTypes, Component } from 'react'
import GoingButtonContainer from '../containers/GoingButtonContainer.js'

export default class Item extends Component {
	render() {
		return (
			<div className = 'col-md-6 col-sm-offset-3'>
				<div className = 'venue text-right'>
					<a href = { this.props.item.url } target = '_blank'>
						<img className = 'img-responsive' src = { this.props.item.image } alt = '...' />
					</a>
					<h3>{ this.props.item.name }</h3>
					<p>
						<span className = 'going'>
							 Going: { this.props.going.length }&nbsp;
							 <small>
								 { this.props.going.map((username) => " " + username )}
							 </small>
						</span>
					</p>
					<p className = 'text-right'>
						<GoingButtonContainer
							item = { this.props.item }
							username = { this.props.username }
							amGoing = { this.props.amGoing } />
					</p>
				</div>
			</div>
		)
	}
}

Item.propTypes = {
	item: PropTypes.object.isRequired,
	going: PropTypes.array.isRequired,
	amGoing: PropTypes.bool.isRequired,
	username: PropTypes.string.isRequired
}
