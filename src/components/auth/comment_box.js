import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';//bind multi actions file
import * as listActions from '../../actions/list';

class CommentBox extends Component {
	_onAdd() {
		let message = this.refs.comment.value;
		let array_comment = this.props.array_list;
		this.props.addNewCommentAction( array_comment, message);
		this.refs.comment.value = '';
	}
	_onChangeComment() {
		this.props.changeContentAction(this.refs.comment.value);
	}
	_onUndo() {
		
	}
	render() {
		// console.log("firebase.auth() ",firebase.auth())
		// let a = ['W8tXSTKbSVVGh9GxdkaaDVdFV5u2','ij3PmP0Ef3aatM4hZlE35SxeDKu2'];
		// let b = a[Math.floor(Math.random() * 1) + 0];
		// firebase.database().ref('users/' + 'ij3PmP0Ef3aatM4hZlE35SxeDKu2').set({a:Math.random()});
		// firebase.database().ref().on('value',(snap) => {
		// 	console.log("snap ",snap.val())
		// })

		return(
			<div>
				<textarea row={3} ref="comment" onChange={this._onChangeComment.bind(this)}/>
				<button 
					onClick={this._onAdd.bind(this)}>
					Comment
				</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		array_list: state.list.array_list,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		...listActions,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox);