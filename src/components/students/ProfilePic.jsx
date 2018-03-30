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

  componentDidMount() {
    console.log('----')
    this.setState({user: this.props.userId}, function(){
      axios.post('/profile', {user: this.state.user})
      .then((response)=> {
        this.setState({pic: response.data.rows[0].thumbnail_url})
        console.log('profile pic mounted--', response.data.rows[0].thumbnail_url)
    })
      .catch((error)=>{
        console.log('error in ProfilePic.jsx', error)
      })
    })
  }

  render() {

const profile ={
  margin: 'auto', 
  borderRadius: '50%',
  height: '40px',
  width: '40px',
}

// let defaultPic = 'https://s3.us-east-2.amazonaws.com/jaqen-app/default-profile.png'
    return (
      <div>
        {/* {this.state.pic === '' ? <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/default-profile.png'} alt={''} style={profile}/> : <img src={this.state.pic} alt={''} style={profile}/>}  */}
        <img src={this.state.pic} alt={''} style={profile}/>
        
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    // class: state.studentClassView.targetClass,
    auth: state.auth
  }
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfilePic);
