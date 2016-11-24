import React, { Component } from 'react';

import Header from '../partials/header';

export default class App extends Component {
  render() {
    return (
		<div>
			{this.props.children}
		</div>
    );
  }
}
