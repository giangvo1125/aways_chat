import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

	class Firebase extends Component {
		

    	componentWillMount() {
    		let config = {
			    apiKey: "AIzaSyBJE-B7sdp7_zIUaoJrjtBhr8oyDm7oyq8",
			    authDomain: "demochat-b1bce.firebaseapp.com",
			    databaseURL: "https://demochat-b1bce.firebaseio.com",
			    storageBucket: "demochat-b1bce.appspot.com",
			    messagingSenderId: "1068307261561"
			};
			firebase.initializeApp(config);
	        
	    }

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	return connect(null)(Firebase);
}