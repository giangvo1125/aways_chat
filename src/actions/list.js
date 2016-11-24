import * as typeActions from './types';
import {browserHistory} from 'react-router';

export function addNewCommentAction(array_comment, comment) {
	return (dispatch) => {
		if(comment != '' && comment != null) {
			let obj = {
				comment: comment,
				id: Math.random()
			}

			if(Array.isArray(array_comment)) {
				let newArray_comment = array_comment.slice();
				newArray_comment.push(obj);
				dispatch({
					type: typeActions.ADD_ITEM_ACTION,
					payload: {array_list: newArray_comment, content: ''}
				})
			}
		}

	}
}

export function editCommentAction(array_comment, item_edit, new_comment) {
	return (dispatch) => {
		let itemIndex = -1;
		if(new_comment != '' && new_comment != null) {
			if(Array.isArray(array_comment)) {
				array_comment.map((item, index) => {
					if(item.id === item_edit.id) {
						itemIndex = index
					}
				});
				if(itemIndex != -1) {
					let newArray_comment = array_comment.slice();
					let previousItem = JSON.parse(JSON.stringify(newArray_comment[itemIndex]));
					newArray_comment[itemIndex].comment = new_comment;

					dispatch({
						type: typeActions.UPDATE_ITEM_ACTION,
						payload: {array_list: newArray_comment}
					})
				}
			}
		}
	}
}

export function deteleCommentAction(array_comment, item_delete) {
	return (dispatch) => {
		let itemIndex = -1;
		if(Array.isArray(array_comment)) {
			array_comment.map((item, index) => {
				if(item.id === item_delete.id) {
					itemIndex = index
				}
			});
			if(itemIndex != -1) {
				let newArray_comment = array_comment.slice();
				let previousItem = JSON.parse(JSON.stringify(newArray_comment[itemIndex]));
				// newArray_comment[itemIndex].comment = new_comment;
				newArray_comment.splice(itemIndex, 1);

				dispatch({
					type: typeActions.DELETE_ITEM_ACTION,
					payload: {array_list: newArray_comment}
				})
			}
		}
	}
}

export function changeContentAction(content) {
	return (dispatch) => {
		dispatch({
			type: typeActions.CHANGE_CONTENT_ACTION,
			payload: {content: content}
		})
	}
}