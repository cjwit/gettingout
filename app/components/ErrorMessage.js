import React, { Component, PropTypes } from 'react';

export default class ErrorMessage extends Component {
	static propTypes = {
		message: PropTypes.string.isRequired
	}

    render() {
        return (
			<div className = "row">
				<div className = "col-sm-6 col-sm-offset-3">
					<div className="alert alert-danger text-center">
						{ this.props.message }
					</div>
				</div>
			</div>
		)
    }
}
