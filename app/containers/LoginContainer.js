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

const LoginContainer = connect(
	null,
	mapDispatchToProps
)(LoginForm)

export default LoginContainer
