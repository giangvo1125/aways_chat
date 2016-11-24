import * as typeActions from '../actions/types';

const initState = {
	array_list: [],
	content:''
}

export default function(state = initState, action) {
	switch(action.type) {
		case typeActions.ADD_ITEM_ACTION:
			return {...state, ...action.payload}

		case typeActions.UPDATE_ITEM_ACTION:
			return {...state, ...action.payload}

		case typeActions.DELETE_ITEM_ACTION:
			return {...state, ...action.payload}

		case typeActions.CLEAN_ITEM_ACTION:
			return {...state, ...action.payload}

		case typeActions.CHANGE_CONTENT_ACTION:
			return {...state, ...action.payload}
	}
	return state;
}