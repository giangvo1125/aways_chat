import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/user';
class Users extends Component {
	_onSignIn() {
		let userInfo = {
			email 	: this.refs.email.value,
			password: this.refs.password.value,
		}
		this.props.signInAction(userInfo);
	}
	_onSignUp() {
		let userInfo = {
			email 	: this.refs.email.value,
			password: this.refs.password.value,
		}
		this.props.signUpAction(userInfo);
	}
	_onSignOut() {
		this.props.signOutAction();
	}
	render() {
		return(
			<div>
				<div className="email">
					<div className="label">Email</div>
					<div className="field"><input type="text" ref="email" /></div>
				</div>
				<div className="password">
					<div className="label">Password</div>
					<div className="field"><input type="password" ref="password" /></div>
				</div>
				<div className="actions">
					<button className="btn-submit" onClick={this._onSignIn.bind(this)}>Sign In</button>
					<button className="btn-submit" onClick={this._onSignUp.bind(this)}>Sign Up</button>
					<button className="btn-submit" onClick={this._onSignOut.bind(this)}>Sign Out</button>
				</div>
			</div>
		)
	}
}

export default connect(null, userActions)(Users);
