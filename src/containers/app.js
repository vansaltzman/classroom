import { connect } from 'react-redux';
import App from '../components/app.jsx';
import * as Actions from '../actions/index.js';

function mapStateToProps(state) {
  return {
		// subject to change
		teachersClassView: state.teachersClassView
	}
}

function matchDispatchToProps() {
	return bindActionCreators(Actions, dispatch);
}

const AppContainer = connect(mapStateToProps)(App)

export default AppContainer;
//would need to use matchDispatchToProps if need to bind any action
