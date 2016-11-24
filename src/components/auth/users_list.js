import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as userActions from '../../actions/user';
import * as chatActions from '../../actions/chat';
class UsersList extends Component {
	_onSignOut() {
		this.props.signOutAction();
	}
  _onChoose(userChat) {
    this.props.makeRoomAction(userChat)
  }
  componentWillMount() {
    this.props.joinRoomAction();
  }
	render() {
    let listUser = Object.keys(this.props.list_user).map((item) => {
			let keyId = Math.random();
			return (
				<div key={keyId}>
					<div className="email" style={{float: 'left', width: '230px'}}>
						{this.props.list_user[item].email}
					</div>
					<div className="choose">
						<button onClick={this._onChoose.bind(this, this.props.list_user[item])}>Choose</button>
					</div>
				</div>
			)
		});
		return(
			<div className='content'>
        <div className='list'>
          {listUser}
        </div>
        <div className='btn-out'>
          <button className='sign-out' onClick={this._onSignOut.bind(this)}>Sign Out</button>
        </div>
      </div>
		)
	}
}

function mapStateToProps(state) {
  return {
    list_user: state.user.list_user,
  }
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		...userActions,
		...chatActions,
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
