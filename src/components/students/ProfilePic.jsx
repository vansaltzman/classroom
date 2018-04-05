import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../../actions/index.js';


class ProfilePic extends React.Component {
  constructor() {
    super()
    this.state = {
      pic: '',
      user: ''
    }
  }

  render() {

    const profile ={
      margin: 'auto', 
      borderRadius: '50%',
      height: '40px',
      width: '40px',
    }

    return (
      <div>
        <img src={this.props.auth.user.pic.length > 0 ? 
          this.props.auth.user.pic : 'https://s3.us-east-2.amazonaws.com/jaqen-app/default-profile.png'} 
            alt={''} 
            style={profile}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePic);
