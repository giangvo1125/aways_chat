import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as listActions from '../../actions/list';

class CommentLine extends Component {
	_onEdit(item) {
		this.props.editCommentAction(this.props.array_list, item, this.props.content);
	}

	_onDelete(item) {
		this.props.deteleCommentAction(this.props.array_list, item);
	}

	render() {
		let comment_list = this.props.array_list.map((item) => {
			let keyId = item + Math.random();
			return (
				<div key={keyId}>
					<div className="comment" style={{float: 'left', width: '230px'}}>
						{item.comment}
					</div>
					<div className="Edit" style={{float: 'left'}}>
						<button onClick={this._onEdit.bind(this, item)}>Edit</button>
					</div>
					<div className="Delete">
						<button onClick={this._onDelete.bind(this, item)}>Delete</button>
					</div>
				</div>
			)
		});

		return(
			<div> {comment_list} </div>
		)
	}
}

function mapStateToProps(state) {
	return {
		array_list: state.list.array_list,
		content: state.list.content,
	}
}

export default connect(mapStateToProps, listActions)(CommentLine);