
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
import AppContainer from './containers/app.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import SignUp from './SignUp.jsx'

//const logger = createLogger();

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
        <SignUp />
	</Provider>,
	document.getElementById('app')
)



