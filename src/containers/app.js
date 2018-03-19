import { connect } from 'react-redux';
import App from '../components/app.jsx';

function mapStateToProps(state) {
  return {
		// subject to change
		teachersClassView: state.teachersClassView
	}
}

const AppContainer = connect(mapStateToProps)(App)

export default AppContainer;
//would need to use matchDispatchToProps if need to bind any action
