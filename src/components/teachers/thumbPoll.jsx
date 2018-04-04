import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import fb from '../../../db/liveClassroom.js'
import Layer from 'grommet/components/Layer';
import Section from 'grommet/components/Section';



class ThumbPoll extends React.Component {
  constructor() {
    super()
    this.state = {
      temp: -90 
    }
  
  }

  findBrightness(degrees) {
    if (degrees >= -90) {
      return (degrees/-90 * 100)
    } else {
      return (((degrees + 90)/-90 - 1) * 100) * -1
    }
  }

  render() {
    let oldDegree = this.state.temp
    let degrees = -90
    let count = 0
    let totalStudentThumbs = 0
    let studentsObj = this.props.teachersClassView.targetClass.students
    for (var student in studentsObj){
      if(studentsObj[student].isHere){
        console.log(studentsObj[student].isHere)
        count++
        totalStudentThumbs += studentsObj[student].thumb
      }
    }
    let test = totalStudentThumbs / count 
     if(count === 0){
      degrees = -90 
      
     } else {
      degrees = test 
     }
     
      console.log('degresssss----',degrees)
      console.log('show thumb poll props',this.props.showThumbPoll)

    let styleSheet = document.styleSheets[0];
    let keyframes =
      `@keyframes frame {
        0%   { transform: rotate(${degrees+4}deg); }
        25% { transform: rotate(${degrees-4}deg); }
        50% { transform: rotate(${degrees+4}deg); }
        75% { transform: rotate(${degrees-4}deg); }
        100% { transform: rotate(${degrees+4}deg); }
      }`
    
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    const thumbStyle={
      height: '30%',
      width: '30%',
      transform: `translate(50% 50%) rotate(${degrees}deg)`,
      margin: 'auto',
      transition: 'transform 2s',
      animation: 'frame 3s infinite',
      filter: `hue-rotate(${(degrees - 90) * .85}deg) brightness(${this.findBrightness(degrees) + 100}%)`

    }

    return (
      <Layer 	
          // align={'center'}
          closer={true}
          flush={false}
          overlayClose={true}
          onClose={()=> {fb.setThumbPollLiveForStudents(this.props.teachersClassView.targetClass.id, false) } }>
        <Section>
          <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='👍' style={thumbStyle}/>       
          
        </Section>
     </Layer>
    )
  }
}
function mapStateToProps(state) {
	return {
		
		teachersClassView: state.teachersClassView,
		auth: state.auth
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThumbPoll)
