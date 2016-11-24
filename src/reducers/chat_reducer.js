import * as typeActions from '../actions/types';

const initState = {
	rooms:[],
  content:{},
}

export default function(state = initState, action) {
	switch(action.type) {
		case typeActions.MAKE_ROOM_ACTION:
			return {...state, ...action.payload}

		case typeActions.JOIN_ROOM_ACTION:
			return {...state, ...action.payload}

		case typeActions.SEND_MESSAGE_ACTION:
			return {...state, ...action.payload}

		case typeActions.RECEIVED_MESSAGE_ACTION:
			return {...state, ...action.payload}

		case typeActions.RECEIVED_ALL_MESSAGE_ACTION:
			return {...state, ...action.payload}

		case typeActions.RELEASE_MESSAGE_ACTION:
			return {...state, ...action.payload}

	}
	return state;
}
