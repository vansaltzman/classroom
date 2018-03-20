
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import cookie from 'react-cookie';
import rootReducer from './reducers/rootReducer';
import AppContainer from './containers/app.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import actionTypes from './actions/types';


//const logger = createLogger();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

//wut do we do with this
// const token = cookie.load('token');
// if(token) {
// 	store.dispatch({type: actionTypes.AUTH_USER});
// }

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('app')
)

