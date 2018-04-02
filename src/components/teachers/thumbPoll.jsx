import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import fb from '../../../db/liveClassroom.js'



class ThumbPoll extends React.Component {
  constructor() {
    super()
    // this.state = {
    
    // }
    // this.countStudentsHere = this.countStudentsHere.bind(this)
  }

  // countStudentsHere() {

  //}

  // let degrees = totalStudentThumbs / count 

  render() {
    let degrees = -90
    let count = 0
    let totalStudentThumbs = 0
    let studentsObj = this.props.teachersClassView.targetClass.students
    for (var student in studentsObj){
      // console.log('student',student)
      if(studentsObj[student].isHere){
        console.log(studentsObj[student].isHere)
        count++
        totalStudentThumbs += studentsObj[student].thumb
      }
    }
    let test = totalStudentThumbs / count 
     if(test !== undefined){
       degrees = test
     } else {
       degrees = -90
     }


console.log('degresssss----',degrees) 
    //   let classId = this.props.teachersClassView.targetClass.id
  //  // fb.setThumbTotal(classId)
  //   //run fb function that iterates through all students and averages their total
  //     //and sets that value in fb  
  //   let degrees

  //   let totalPresentStudents = this.countStudentsHere()
  //   console.log('total present students', totalPresentStudents)
  
  //   if(totalPresentStudents > 0) {
  //      degrees = this.props.teachersClassView.targetClass.thumbTotal / (totalPresentStudents )
  //   } else {
  //     degrees = this.props.teachersClassView.targetClass.thumbTotal
  //   }
  //   console.log('--------degreess',degrees)
    

    const thumbStyle={
      height: '30%',
      width: '30%',
      transform:`rotate(${degrees}deg)`
    }

    return (
      <div>
        <div style={{
          left: 0,
          lineHeight: '200px',
          marginTop: '-100px',
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          width: '100%'
        }}>

          <img src={'https://s3.us-east-2.amazonaws.com/jaqen-app/thumb.png'} alt='' style={thumbStyle}/>       

        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
	return {
		
		teachersClassView: state.teachersClassView,
		auth: state.auth
		// targetClass: state.studen
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ThumbPoll)
