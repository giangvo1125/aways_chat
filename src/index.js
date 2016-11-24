import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import loggerMiddleware from './middlewares/logger';

import App from './components/app';
import RequireAuth from './hoc/require_auth';
import RequireDemo from './hoc/require_demo';
import RequireFirebase from './hoc/require_firebase';
import RunApp from './components/auth/runapp';
import reducers from './reducers';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const createStoreWithMiddleware = applyMiddleware(reduxThunk, loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if(token){
	//update application state
	store.dispatch({type: AUTH_USER});
}

const Feature = () => {
	return <div>Feature</div>
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={RequireFirebase(App)}>
                <Route path="app" component={RunApp} />
            </Route>
        </Router>
    </Provider>
    , document.querySelector('.container')
)
