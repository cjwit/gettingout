import React, { PropTypes, Component } from 'react';

export default class InputSubmit extends Component {
	static propTypes = {
		submitFunction: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired
	}

	state = {
        value: ""
    }

    componentDidMount() {
		const submit = $('#' + this.props.name)
		submit.prop('disabled', true);

		// set listener for clicking Enter
		$('#value').keypress((e) => {
			const keycode = (e.keyCode ? e.keyCode : e.which);
			if (keycode == '13') {
				submit.click();
			}
		})
    }

	resetForm() {
		this.setState({ value: "" });
		$('#' + this.props.name).prop('disabled', true);
	}

    submitValue = (e) => {
        e.preventDefault();
        const value = this.state.value,
			submitFunction = this.props.submitFunction;

		console.log('value from input', value);
        submitFunction(value);
		this.resetForm();
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
		// set submit button
        const submit = $('#' + this.props.name),
            value = this.state.value.length > 0,
			valid = value;
        if (valid) {
            submit.prop('disabled', false);
        } else {
            submit.prop('disabled', true);
        }
    }

    render() {
		const onClick = this.submitValue;
		const errorDivId = "error_" + this.props.name;

        return (
			<div>
                <div className = "form-group">
					<div className="input-group">
	                    <input type="text" className="form-control"
	                           id="value"
	                           name = "value"
	                           placeholder= { this.props.placeholder }
	                           value = { this.state.value }
	                           onChange = { this.handleInputChange } />
						   <span className = "input-group-btn">
							   <button id = { this.props.name } className = "btn btn-default" onClick = { onClick } type = "button">Submit</button>
						   </span>
	                </div>
                </div>
				<div id = { errorDivId } className="alert alert-danger hidden" />
			</div>
        )
    }
}
