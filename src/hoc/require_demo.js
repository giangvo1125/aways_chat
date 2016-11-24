import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

	class AuthenDemo extends Component {
		static contextTypes = {
      		router: React.PropTypes.object
    	}

    	componentWillMount() {
    		setTimeout(()=> {
    			this.context.router.push('/form');
    		},5000)
	        
	    }

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	return connect(null)(AuthenDemo);
}