import * as typeActions from '../actions/types';

const initState = {
	login: false,
	user: {},
	list_user:{},
}

export default function(state = initState, action) {
	switch(action.type) {
		case typeActions.SIGN_IN_ACTION:
			return {...state, ...action.payload}

		case typeActions.CHECK_LOGIN_ACTION:
			return {...state, ...action.payload}

		case typeActions.SIGN_OUT_ACTION:
			return {...state, ...action.payload}

		case typeActions.SIGN_UP_ACTION:
			return {...state, ...action.payload}

		case typeActions.GET_LIST_ACTION:
			return {...state, ...action.payload}

	}
	return state;
}
