import React from 'react';
import * as actions from '../../actions/index.js';
import moment from 'moment';
import axios from 'axios'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";

class Statistics extends React.Component {
  render() {
		return(
			<div>
				Statistics
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
    teachersClassView: state.teachersClassView,
	}
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);
