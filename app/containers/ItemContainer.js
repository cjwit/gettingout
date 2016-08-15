import { connect } from 'react-redux'
import { updateSelected } from '../actions'
import Item from '../components/Item'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateSelected: (yelpID, user, going) => {
			dispatch(updateSelected(yelpID, user, going))
		}
	}
}

const ItemContainer = connect(
	null,
	mapDispatchToProps
)(Item)

export default ItemContainer
