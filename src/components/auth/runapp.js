import React, { Component } from 'react';
import ChatBox from './chat_box';
import Users from './users';
import UsersList from './users_list';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as userActions from '../../actions/user';
import * as chatActions from '../../actions/chat';
class RunApp extends Component {
	componentWillMount() {
		this.props.checkLoginAction();
	}
	render() {
		let list_chat_box = this.props.rooms.map((item) => {
      return (
        <div className="row" key={Math.random()}>
					<ChatBox key={Math.random()} roomId={item} />
				</div>
      )
    })
		return(
			<div>
				{
					this.props.login == true ? <UsersList/> : <Users/>
				}<br/>
				{list_chat_box}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		login: state.user.login,
		rooms: state.chat.rooms,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		...userActions,
		...chatActions,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RunApp);
