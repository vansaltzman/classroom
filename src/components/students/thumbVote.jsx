import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import NumberInput from 'grommet/components/NumberInput';
import fb from '../../../db/liveClassroom.js'
import debounce from 'lodash/debounce';
// import NumberInput from 'grommet/components/NumberInput';


class ThumbVote extends React.Component {
  constructor() {
    super()
    this.state = {
      thumbs: -90,
      degree: -90
    }
    this.handleChange = this.handleChange.bind(this)
    this.do = this.do.bind(this)
  }

  do(e) {
    this.setState({degree: e.target.value})
  }

  
  handleChange = debounce((e) => {
  
    let oldValue = parseInt(this.state.thumbs)
    let classId = 1//this.props.activeView.id
    let studentId = this.props.auth.user.id
    let difference;
    let newVal = parseInt(this.state.degree)
    console.log('---newVal----', newVal)
    console.log('THIS USERS ID IS ', studentId)
    this.setState({
      thumbs: newVal
      // thumbs: 1
    }, function() {

     
  
    //  fb.decrementThumbTotal(classId, parseInt(this.state.degree)) 
            if(oldValue > newVal) {
              // console.log(oldValue, ' is greater than ', newVal)
              // console.log('thumbs going down')

              difference = oldValue - newVal
              // newVal = parseInt(newVal)

              // console.log('----difference', difference)
              fb.decrementThumbTotal(classId, studentId, difference)

            }
            if(oldValue < newVal) {
              // console.log(oldValue, ' is less than ', newVal)
              // console.log('thumbs going up')

              difference = newVal - oldValue
              // newVal = parseInt(newVal)

              // console.log('----difference', difference)
              fb.incrementThumbTotal(classId, studentId, difference)
          }
          
    })
    
    // fb.decrementThumbTotal(classId, parseInt(this.state.thumbs))
    // fb.updateThumbPollTotal()
    //console.log(this.state.thumbs)
    // console.log(this.state.thumbs)
    // debounce(function() {fb.decrementThumbTotal(classId, parseInt(this.state.thumbs))}, 100 )
  }, 100)



  render() {


  //-180 to 0

    let degrees = this.state.degree

    let styleSheet = document.styleSheets[0];
    let keyframes =
      `@keyframes frame {
        0%   { transform: rotate(${degrees+10}deg); }
        25% { transform: rotate(${degrees-10}deg); }
        50% { transform: rotate(${degrees+10}deg); }
        75% { transform: rotate(${degrees-10}deg); }
        100% { transform: rotate(${degrees+10}deg); }
      }`
    
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    const thumbStyle={
      height: '30%',
      width: '30%',
      transform:`rotate(${degrees}deg)`,
      marginBottom: '50px',
      // animation: 'frame 3s infinite'
    }




console.log('--degrees', degrees)

    return (
      <div>
        <div style={{
          margin: 'auto',
          textAlign: 'center',
          marginTop: '100px',
        }}>

          <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='' style={thumbStyle}/>       

            <div>
              <input type="range" name="thumbs" min="-180" max="0" step="0" value={this.state.degree} 
              onChange={(e) => {this.do(e), this.handleChange(e.persist())}} />
            </div>  

        </div>
        
      </div>
    )
  }
}
function mapStateToProps(state) {
	return {
		activeView: state.studentClassView.targetClass,
		studentState: state.studentClassView,
		auth: state.auth
		// targetClass: state.studen
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThumbVote)
