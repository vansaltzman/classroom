import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import NumberInput from 'grommet/components/NumberInput';
import fb from '../../../db/liveClassroom.js'
import debounce from 'lodash/debounce';
// import NumberInput from 'grommet/components/NumberInput';
import Layer from 'grommet/components/Layer';



class ThumbVote extends React.Component {
  constructor() {
    super()
    this.state = {
      thumbs: -90,
      degree: -90,
      animate: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.do = this.do.bind(this)
    this.handleAnimate = this.handleAnimate.bind(this)
  }


  findBrightness(degrees) {
    if (degrees >= -90) {
      return (degrees/-90 * 100)
    } else {
      return (((degrees + 90)/-90 - 1) * 100) * -1
    }
  }

  do(e) {
    this.setState({degree: e.target.value})
  }

  handleAnimate() {
    this.setState({animate: !this.state.animate})
  }
  
  handleChange = debounce((e) => {
  
    let oldValue = parseInt(this.state.thumbs)
    let classId = 1//------this.props.activeView.id
    let studentId = this.props.auth.user.id
    let difference;
    let newVal = parseInt(this.state.degree)
    console.log('---newVal----', newVal)
    console.log('THIS USERS ID IS ', studentId)
    this.setState({
      thumbs: newVal
      // thumbs: 1
    }, function() {
            if(oldValue > newVal) {
              difference = oldValue - newVal

              fb.decrementThumbTotal(classId, studentId, difference)
            }
            if(oldValue < newVal) {
              difference = newVal - oldValue

              fb.incrementThumbTotal(classId, studentId, difference)
          }
    })
  }, 100)

  render() {

    let degrees = this.state.degree
    let thumbs = this.state.thumbs

    let styleSheet = document.styleSheets[0];
    let keyframes =
      `@keyframes frame {
        0%   { transform: rotate(${10}deg); }
        25% { transform: rotate(${-10}deg); }
        50% { transform: rotate(${10}deg); }
        75% { transform: rotate(${-10}deg); }
        100% { transform: rotate(${10}deg); }
      }`
    
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    const thumbStyleStatic={
      height: '30%',
      width: '30%',
      transform:`rotate(${degrees}deg)`,
      marginBottom: '50px',
      // animation: 'frame 3s infinite'
    }

    const thumbStyleAnimate={
      height: '30%',
      width: '30%',
      transform:`rotate(${degrees}deg)`,
      marginBottom: '50px',
      filter: `hue-rotate(${(thumbs - 90) * .85}deg) brightness(${this.findBrightness(thumbs) + 100}%)`
      // animation: 'frame 3s infinite'
    }

    const outDiv = {
      animation: 'frame 3s infinite'
    }

      console.log('--degrees', degrees)

    return (
      <Layer 	
      closer={false}
      flush={false}
      overlayClose={true}
      >
      <div>
        <div style={{
          margin: 'auto',
          textAlign: 'center',
          marginTop: '100px',
        }}>
        <div style={outDiv}>
          <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='' style={thumbStyleAnimate}/>       
        </div>
            <div>
              <input type="range" name="thumbs" min="-180" max="0" step="0" value={this.state.degree} 
              onChange={(e) => {this.do(e), this.handleChange(e.persist())}} 
              // onMouseDown={this.handleAnimate} onMouseUp={this.handleAnimate}
              />
            </div>  

        </div>
        
      </div>
      </Layer>
    )
  }
}
function mapStateToProps(state) {
	return {
		activeView: state.studentClassView.targetClass,
		studentState: state.studentClassView,
		auth: state.auth
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThumbVote)
