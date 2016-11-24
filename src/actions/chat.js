import * as typeActions from './types';
import {browserHistory} from 'react-router';

export function makeRoomAction(userChat) {
	return (dispatch, getState) => {
		let state = getState();
		if(userChat && state.user.user &&  state.user.user.uid != userChat.uid) {
      let roomId = state.user.user.uid + '_' + userChat.uid;
			let isExisted = null;
			let isExistedRefs = firebase.database().ref().child('rooms').child(roomId);
			isExistedRefs.on('value',(snapshot) => {
				isExisted = snapshot.val();
			})
      if(isExisted == null || isExisted == '' || isExisted == undefined) {
				let roomRefs = firebase.database().ref().child('rooms').child(roomId);
	      let newRoomRefs = roomRefs.push();
	      newRoomRefs.update({
	          from: state.user.user.uid,
						email_from:state.user.user.email,
	          to: userChat.uid,
						email_to:userChat.email,
	          is_create_message:true,
	          message:'wellcome'
	      });
	      let newArray_roomList = state.chat.rooms.slice();
	      newArray_roomList.push(roomId);
	      dispatch({
	        type : typeActions.MAKE_ROOM_ACTION,
	        payload:{rooms: newArray_roomList}
	      })
			}
			else {
				console.log("da tao room vs user nay")
			}
		}
	}
}

export function joinRoomAction() {
  return (dispatch, getState) => {
		let state = getState();
    firebase.database().ref().on('value',(snapshot) => {
			let roomsObj = snapshot.val().rooms;
			let new_content = JSON.parse(JSON.stringify(state.chat.content));
			let new_rooms = state.chat.rooms.slice();
			for(let key in roomsObj) {
				let roomId = key;
				let index = roomId.indexOf('_');
        let uid_to = roomId.substr(index + 1, roomId.length);
				let uid_from = roomId.substr(0, index);
        if(uid_to == state.user.user.uid || uid_from == state.user.user.uid) {
					new_rooms.push(roomId);
          new_content[roomId] = [];
        }
			}
			dispatch({
				type : typeActions.JOIN_ROOM_ACTION,
				payload : {content: new_content, rooms: new_rooms}
			})
			for(let i = 0; i < new_rooms.length; i++) {
				dispatch(receivedMessageAction(new_rooms[i], 10))
			}

    })
  }
}

export function sendMessageAction(roomId, message) {
	return (dispatch, getState) => {
		let state = getState();
		let index = roomId.indexOf('_');
		let uid_to = roomId.substr(index + 1, roomId.length);
		let uid_from = roomId.substr(0, index);
		let roomRefs = firebase.database().ref().child('rooms').child(roomId);
		let newRoomRefs = roomRefs.push();
		let message_obj = {
				from: state.user.user.uid,
				email_from: state.user.user.email,
				to: state.user.user.uid == uid_to ? uid_from : uid_to,
				email_to: state.user.user.uid == uid_to ? state.user.list_user[uid_from].email : state.user.list_user[uid_to].email,
				is_create_message:false,
				message: message
		}
		newRoomRefs.update(message_obj);
		let new_content = JSON.parse(JSON.stringify(state.chat.content));
		new_content[roomId].push(message_obj);
		dispatch({
			type : typeActions.SEND_MESSAGE_ACTION,
			payload:{content: new_content}
		})
		dispatch(receivedMessageAction(roomId, 10))
	}
}

export function receivedMessageAction(roomId, limit) {
	return (dispatch, getState) => {
		let state = getState();
		let roomRefs = firebase.database().ref().child('rooms').child(roomId);
		roomRefs.limitToLast(limit).on('value',(snapshot)=> {
			let message_obj = snapshot.val();
			let new_content = JSON.parse(JSON.stringify(state.chat.content));
			let new_message = [];
			for(let key in message_obj) {
					new_message.push(message_obj[key])
			}
			new_content[roomId] = new_message;
			dispatch({
				type: typeActions.RECEIVED_MESSAGE_ACTION,
				payload: {content: new_content}
			})
		})
	}
}
