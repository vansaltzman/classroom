
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import App from './components/app.jsx';
//import ClassView from './components/classView.jsx';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { Router, Route, browserHistory } from 'react-router'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

//const logger = createLogger();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))



ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)

