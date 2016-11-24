import * as typeActions from './types';
import {browserHistory} from 'react-router';

export function signUpAction(userInfo) {
	return (dispatch) => {
		if(userInfo) {
			firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
			.then((response) => {
				firebase.database().ref('users/' + response.uid).set({
					email : response.email,
					password : userInfo.password,
					uid: response.uid,
			  });
				dispatch({
					type: typeActions.SIGN_UP_ACTION,
					payload: {login: false}
				})
				alert('Create successful');
			})
			.catch((error) => {
				console.log('error ',error);
			});
		}
	}
}

export function signInAction(userInfo) {
	return (dispatch) => {
		if(userInfo) {
			firebase.auth().signInWithEmailAndPassword(userInfo.email, userInfo.password)
			.then((response)=> {
				dispatch({
					type: typeActions.SIGN_IN_ACTION,
					payload: {login: true, user: response}
				})
			})
			.catch((error) => {
				console.log('error ',error);
			});
		}
	}
}

export function checkLoginAction() {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(function(user) {
		 	if (user) {
				console.log("da login");
				// let usersss = firebase.auth().currentUser;
				dispatch({
					type: typeActions.CHECK_LOGIN_ACTION,
					payload: {login: true, user: user}
				})
				dispatch(getListUserAction())
			} else {
				console.log('chua login');
				dispatch({
					type: typeActions.CHECK_LOGIN_ACTION,
					payload: {login: false}
				})
			}
		});
	}
}

export function signOutAction() {
	return (dispatch) => {
		firebase.auth().signOut()
		.then(() => {
		  	console.log("da logout.");
		  	dispatch({
		  		type: typeActions.SIGN_OUT_ACTION,
		  		payload: {login: false, user: {}}
		  	})
				dispatch({
					type: typeActions.RELEASE_MESSAGE_ACTION,
					payload: {rooms:[], content:{}}
				})
		},(error) => {
		  	console.log("err ",error)
		  	alert('error log out');
		});
	}
}

export function getListUserAction() {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged(function(user) {
		 	if (user) {
				firebase.database().ref().on('value',(snapshot) => {
					let objUser = snapshot.child('users').val();
					for(let key in objUser) {
						if(key == user.uid) delete objUser[key];
					}
					dispatch({
						type: typeActions.GET_LIST_ACTION,
						payload: {list_user: objUser}
					})
				})

			} else {
				// alert('no user logined');
			}
		});
	}
}
