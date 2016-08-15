import { connect } from 'react-redux'
import { getUser, login, logout, register } from '../actions'
import LoginForm from '../components/LoginForm.js'

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getUser: () => {
			dispatch(getUser())
		},
		login: (user) => {
			dispatch(login(user))
		},
		logout: () => {
			dispatch(logout())
		},
		register: (user) => {
			dispatch(register(user))
		}
	}
}

function mapStateToProps(state) {
	// console.log('### mapStateToProps')
	// console.log(' -- state:', state)
	const username = state.user.username,
		  userMessage = state.user.message,
		  userFetching = state.user.isFetching;

	return {
		username,
		userMessage,
		userFetching
	}
}

const LoginContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm)

export default LoginContainer
