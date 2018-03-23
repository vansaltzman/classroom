import React from 'react';
import axios from 'axios';
import Question from './Question.jsx'
// import data from '../../../data/quizDummyData.js'
import data from '../../../data/quizDummyData.js'
// import Form from 'grommet/components/Form';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import Title from 'grommet/components/Title';
import * as Actions from '../../actions/index.js';




class StudentViewQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [1]
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this) 
    
  }

componentDidMount() {

}

forwardClick(e) {
  e.preventDefault()
  console.log('-------',this.props)
let copy = Object.assign({}, this.props.quizResponseObj)
      copy.currentQuestion++
      //**Need the studentId and classID 
      // this.props.insertStudentAnswers(quizObj, studentId, quizId, classId)
        // this.props.insertStudentAnswers(copy, studentId, quizId, classId)
        
        this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)

        if(!this.state.count.includes(currentQuestion)) {
          this.state.count.push(currentQuestion)
        }
}

backwardClick(e) {


  // e.preventDefault()
  
  let copy = Object.assign({}, this.props.quizResponseObj)
  copy.currentQuestion--
  //**Need the studentId and classID 
  // this.props.insertStudentAnswers(quizObj, studentId, quizId, classId)
    //this.props.insertStudentAnswers(copy, studentId, quizId, classId)

    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

render() {

  //let classId = this.props.class[this.props.class.id]
  let classId ='25'
  //let quizId = this.props.class[classId].activeView
  let quizId = '12'
  //let studentId = this.props.auth.user.userId
  let studentId = '37' 

//The question NUMBER this student is on //from student portion
  let currentQuestion = this.props.class[classId].students[studentId].quizzes[this.props.class[classId].activeView].currentQuestion

//Student's responseObj at current question
  let quizResponseObj = this.props.class[classId].students[studentId].quizzes[this.props.class[classId].activeView]//.responses[currentQuestion]

//The ACTUAL QUESTION this student is on // from the teachers quiz at key of students current question// to display question text
  let question = this.props.class[classId].quizzes[this.props.class[classId].activeView].questions[currentQuestion]
  
//The Quiz
  let quiz = this.props.class[classId].quizzes[this.props.class[classId].activeView].questions

//The students ANSWERS Obj of Booleans //from student portion
  let currentQuestionsAnswers = this.props.class[classId].students[studentId].quizzes[this.props.class[classId].activeView].responses[currentQuestion].answers
  

  // console.log('question',question)
     console.log('currentQuestion in student View Quiz',currentQuestion)
     console.log('answers', currentQuestionsAnswers)
  return (
    <Section pad='large'>    
      <Header>
        <Heading>
           Quiz
        </Heading>
      </Header>
    
        <Title>Question {currentQuestion} </Title>
        {/* Current Question from quiz object at key of [this student's quizID currect question   */}   
          <Question 
            passedProps={this.props}
            question={question}
            currentQuestionsAnswers={currentQuestionsAnswers}
            quizResponseObj={quizResponseObj}
            currentQuestion={currentQuestion}
            studentId={studentId}
            classId={classId}                  
          />

          {currentQuestion > 1 ? <span>
          <Button 
            label='Previous Question'
            href='#'
            primary={true}
            secondary={false}
            accent={false}
            critical={false}
            plain={false}
            onClick={(e)=> this.backwardClick(e)} 
            />
            </span>  : <span></span>}
            
            {currentQuestion < Object.keys(quiz).length ? <span>
            <Button 
            label='Next Question'
            href='#'
            primary={true}
            secondary={false}
            accent={false}
            critical={false}
            plain={false}
            onClick={(e)=> this.forwardClick(e)}
            />
            </span> : <span></span>}
            
            {this.state.count.length === quiz.length ? 
            <div>
              <button>Submit Quiz</button>
            </div>
            : <span></span>}

    </Section>
    )
  }
}



export default StudentViewQuiz;