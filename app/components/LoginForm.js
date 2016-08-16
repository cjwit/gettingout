import React, { Component, PropTypes } from 'react';
import ErrorMessage from './ErrorMessage.js';

export default class LoginForm extends Component {
	state = {
		username: "",
		password: ""
	}

	componentDidMount() {
		$('#loginSubmit').prop('disabled', true);
		$('#createAccountSubmit').prop('disabled', true);
	}

	openForm() {
		$("#loginForm").removeClass('hidden');
		$("#default").addClass('hidden');
	}

	closeForm() {
		$("#loginForm").addClass('hidden');
		$("#default").removeClass('hidden');
	}

	createAccount = (e) => {
		e.preventDefault();
		const user = this.state;
		console.log('clicked createAccount, state:', user)
		this.props.register(user);
	}

	clickLogin = (e) => {
		e.preventDefault();
		const user = this.state;
		console.log('clicked login, state:', user)
		this.props.login(user);
	}

	clickLogout = (e) => {
		e.preventDefault();
		console.log('clicked logout')
		this.props.logout();
	}

	handleInputChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		const state = this.state;
		state[name] = value;
		this.setState(state);
		this.validateForm();
	}

	validateForm() {
		const loginSubmit = $('#loginSubmit'),
			createAccountSubmit = $('#createAccountSubmit'),
			validUsername = this.state.username.length > 0,
			validPassword = this.state.password.length > 0,
			valid = validUsername && validPassword;

		if (valid) {
			loginSubmit.prop('disabled', false);
			createAccountSubmit.prop('disabled', false);
		} else {
			loginSubmit.prop('disabled', true);
			createAccountSubmit.prop('disabled', true);
		}
	}

    render() {
		// add error message support
		const err = this.props.message !== '' ?
			<ErrorMessage message = { this.props.userMessage } /> : null

		return (
			<div className="container">
				<div className = { this.props.username == '' ? 'hidden' : 'row form-group' } id="loggedIn">
					<button className = 'btn btn-primary pull-right' onClick = { this.clickLogout }>
						{ this.props.username } Logout
					</button>
				</div>
				<div className = { this.props.username == '' ? 'row form-group' : 'hidden' } id="default">
					<button className = 'btn btn-primary pull-right' onClick = { this.openForm }>
						Log in or create an account
					</button>
				</div>
				<div className= { this.props.username == '' ? 'row hidden form-group' : 'hidden' } id="loginForm">
		            <div id="usernameField" className="col-md-4">
	                    <div className="form-group">
	                        <input type="text"
								   className="form-control"
								   id="username"
								   name="username"
								   placeholder = "Username"
								   value = { this.state.username }
								   onChange = { this.handleInputChange } />
	                    </div>
					</div>
					<div id="passwordField" className="col-md-4">
						<div className="form-group">
							<input type="password"
								   className="form-control"
								   id="password"
								   placeholder = "Password"
								   name="password"
								   value = { this.state.password }
								   onChange = { this.handleInputChange } />
						</div>
					</div>
					<div id="loginButtons" className="col-md-4">
						<div className="btn-group">
							<button id = "loginSubmit" onClick = { this.clickLogin} className="btn btn-default">Login</button>
							<button id = "createAccountSubmit" onClick = { this.createAccount } className="btn btn-default">Create Account</button>
							<button className = 'btn btn-default' onClick = { this.closeForm }>Cancel</button>
						</div>
					</div>
		        </div>
				{ err }
		    </div>
        )
    }
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	userMessage: PropTypes.string,
	userFetching: PropTypes.bool.isRequired
}
