import * as typeActions from '../actions/types';

const initState = {
	comment: '',
	array_comment:[],
	status:typeActions.ADD_COMMENT_ACTION,
	current: null,
	previous: null,
};

export default function(state = initState, action) {
	switch(action.type) {

		case typeActions.ADD_COMMENT_ACTION:
			return {
				...state, 
				comment: action.payload.comment, 
				array_comment: action.payload.array_comment.slice(),
				status: action.payload.status,
			};

		case typeActions.EDIT_COMMENT_ACTION:
			return {
				...state, 
				comment: action.payload.comment, 
				array_comment: action.payload.array_comment.slice(),
				status: action.payload.status,
				current: action.payload.current,
				previous: action.payload.previous,
			};

		case typeActions.CLICK_ROW_COMMENT_ACTION:
			return {
				...state, 
				current: action.payload
			};

		case typeActions.CHANGE_STATUS_ACTION:
			return {
				...state,
				status: action.payload
			};

		case typeActions.CHANGE_CONTENT_COMMENT_ACTION:
			return {
				...state, 
				comment: action.payload,
			};

		case typeActions.DELETE_COMMENT_ACTION:
			return {
				...state, 
				comment: action.payload.comment, 
				array_comment: action.payload.array_comment.slice(),
				status: action.payload.status,
				current: action.payload.current,
				previous: action.payload.previous,
			};

		case typeActions.UNDO_COMMENT_ACTION:
			return { 
				...state 
			};
	}

	return state;
}