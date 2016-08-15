import { connect } from 'react-redux'
import { updateSelected } from '../actions'
import GoingButton from '../components/GoingButton'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		updateSelected: (yelpID, user, going) => {
			dispatch(updateSelected(yelpID, user, going))
		}
	}
}

const GoingButtonContainer = connect(
	null,
	mapDispatchToProps
)(GoingButton)

export default GoingButtonContainer
