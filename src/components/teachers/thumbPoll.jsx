import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import fb from '../../../db/liveClassroom.js'
import Layer from 'grommet/components/Layer';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Label from 'grommet/components/Label';
import Headline from 'grommet/components/Headline';
import TextInput from 'grommet/components/TextInput';



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
    //   <Layer 	
    //       // align={'center'}
    //       closer={true}
    //       flush={false}
    //       overlayClose={true}
    //       onClose={()=> {fb.setThumbPollLiveForStudents(this.props.teachersClassView.targetClass.id, false) } }>
    //     <Section
    //       style={{height: '800px', width: '800px'}}
    //     >
    //       <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='👍' style={thumbStyle}/>       
          
    //     </Section>
    //  </Layer>


<Layer 	
  // align={'center'}
  closer={true}
  flush={false}
  overlayClose={true}
  onClose={()=> {
    fb.setThumbPollLiveForStudents(this.props.teachersClassView.targetClass.id, false) 
    fb.clearThumbFields(this.props.teachersClassView.targetClass.id)
  } }>
<Box
  style={{height: '800px', width: '800px'}}
  direction="column"
  justify="between"
  align="center"
>
  <Box
    margin="none"
    pad="small"
  >
    <textarea
      style={{fontSize: '48px', textAlign: 'center', resize: 'none', border:0}}
      placeholder="Thumb Poll"
      data-gramm_editor="false"
      rows="2"
      value={this.props.teachersClassView.targetClass.thumbName}
      onChange={ (name)=> fb.updateThumbName(name.target.value, this.props.teachersClassView.targetClass.id) } 
    />
  </Box>
  {/* <Headline
    style={{marginTop: '30px'}}
  >
      {this.props.teachersClassView.targetClass.thumbName || 'Thumb Poll'}
  </Headline> */}

  <div style={{
    // margin: 'auto',
    textAlign: 'center',
    // marginTop: '100px',
  }}>
  <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='👍' style={thumbStyle}/>      
  </div>
  <Box
    direction="row"
    justify="center"
    pad="medium"
    size="full"
    full="horizontal"
  >
    {/* <Label
      margin="none"
      style={{marginRight: '15px', lineHeight: '40px'}}
    >
      {this.props.teachersClassView.targetClass.thumbLow || 'Low'}
    </Label> */}

    <TextInput
      style={{fontSize: '28px'}}
      placeHolder="Low"
      value={this.props.teachersClassView.targetClass.thumbLow}
      onDOMChange={ (text)=> fb.updateThumbLow(text.target.value, this.props.teachersClassView.targetClass.id) }
    />

    {/* <span style={{width: '600px', height: '40px', marginBottom: '30px', backgroundColor:'lightgrey'}}></span> */}

    <TextInput
      style={{fontSize: '28px'}}
      placeHolder="High"
      value={this.props.teachersClassView.targetClass.thumbHigh}
      onDOMChange={ (text)=> fb.updateThumbHigh(text.target.value, this.props.teachersClassView.targetClass.id) }
    />

    {/* <Label
      margin="none"
      style={{marginLeft: '15px', lineHeight: '40px'}}
    >
      {this.props.teachersClassView.targetClass.thumbHigh || 'High'}
    </Label> */}
  </Box>  
</Box>
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
