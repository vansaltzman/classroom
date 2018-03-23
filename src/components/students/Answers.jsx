import React from 'react';
import ListItem from 'grommet/components/ListItem';
import CheckBox from 'grommet/components/CheckBox';



class Answers extends React.Component {
  constructor(props){
    super(props);
    // this.state = {
    //   answer: '',
    //   checkedStatus: false
    // }
    this.handleChange = this.handleChange.bind(this);
     //let studentId = this.props.auth.user.userId
     //let studentId = '37'

     //let classId = this.props.class.students[this.props.auth.user.userId].activeView
     //let classId = '25'
     console.log('this.props in answers', this.props)
  }


  handleChange(e) {    
    //the quiz object at key 12 

    // let copy = Object.assign({}, this.props.currentQuestionsAnswers)
    //   copy.answers[this.props.answerNum] = !copy.answers[this.props.answerNum] 
    //   copy[this.props.answerNum] = !this.props.currentQuestionsAnswers[this.props.answerNum]
        
    let copy = Object.assign({}, this.props.quizResponseObj)
      copy.responses[this.props.currentQuestion].answers[this.props.answerNum] = !copy.responses[this.props.currentQuestion].answers[this.props.answerNum]
      //**Need the studentId and classID 
      // this.props.insertStudentAnswers(quizObj, studentId, quizId, classId)
        this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
        
  }

render() {
  return (
    
        <ListItem separator='horizontal' justify='between'>
          
          <span>
             {this.props.answerNum + ' )'} {this.props.answersText[this.props.answerNum].text}
             {/* this.props.class.students[studentId].quizzes[this.props.class.activeView].answers[this.props.answerNum].text} */}
          </span>
                
          <span className='secondary'>     
                <CheckBox type="checkbox" 
                  name="answer" 
                  // value={this.props.class.students[studentId].quizzes[this.props.class.activeView].answers[this.props.answerNum].text} 
                  // checked={this.props.class.students[studentId].quizzes[this.props.class.activeView].answers[this.props.answerNum]}
                  checked={this.props.currentQuestionsAnswers[this.props.answerNum]}
                  onChange={(e) => this.handleChange(e)}/>
            </span>
            
          
        
        </ListItem>
    
    )
  }
}
export default Answers;