import { connect } from 'react-redux'
import { addGoing } from '../actions'
import Item from '../components/Item'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addGoing: () => {
			dispatch(addGoing(ownProps.item.yelpID, ownProps.user))
		}
	}
}

const ItemContainer = connect(
	null,
	mapDispatchToProps
)(Item)

export default ItemContainer
