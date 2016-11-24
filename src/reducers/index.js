import { combineReducers } from 'redux';
import {reducer as form} from 'redux-form';
import AppReducer from './app_reducer';
import ListReducer from './list_reducer';
import UserReducer from './user_reducer';
import ChatReducer from './chat_reducer';

const rootReducer = combineReducers({
	// app: AppReducer,
	list: ListReducer,
	user: UserReducer,
	chat: ChatReducer,
});

export default rootReducer;
