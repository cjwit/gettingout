import { connect } from 'react-redux'
import { updateSelected } from '../actions'
import GoingButton from '../components/GoingButton'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateSelected: (yelpID, username, going) => {
			dispatch(updateSelected(yelpID, username, going))
		}
	}
}

const GoingButtonContainer = connect(
	null,
	mapDispatchToProps
)(GoingButton)

export default GoingButtonContainer
