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
      count: [],
      arrayOfQuestionIds: []
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this) 
    console.log('PROPS IN StudentViwQuiz.jsx', this.props)
  }

componentDidMount() {
  // let quiz = this.props.class.quizzes[this.props.class.activeView].questions
  // let keys = Object.keys(quiz)
  this.setState({
    arrayOfQuestionIds: this.props.keys
  }, function() {
    console.log('---array of question ids',this.state.arrayOfQuestionIds)

  })

}

forwardClick(e) {
  e.preventDefault()
  if(!this.state.count.includes(this.props.currentQuestion)) {
    this.state.count.push(this.props.currentQuestion)
  }
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)
    copy.currentQuestion++
    console.log('COPY', copy)
    console.log('QUIZ RESPONSE OBJ', quizResponseObj)
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

backwardClick(e) {
  e.preventDefault()
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)
    copy.currentQuestion--
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

render() {
    let currentQuestion = this.props.currentQuestion
  return (
    <Section pad='large'>    
      <Header>
        <Heading>
           Quiz
        </Heading>
      </Header>
    
        <Title>Question {currentQuestion + 1} </Title>
          <Question 
            // passedProps={this.props}
            question={this.props.question}
            currentQuestionsAnswers={this.props.currentQuestionsAnswers}
            quizResponseObj={this.props.quizResponseObj}
            currentQuestion={currentQuestion}
            studentId={this.props.studentId}
            classId={this.props.classId} 
            questionId={this.props.questionId}   
            insertStudentAnswers={this.props.insertStudentAnswers}  
            quizId={this.props.quizId}            
          />

          {currentQuestion > 0 ? <span>
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
            
            {currentQuestion < this.props.keys.length - 1 ? <span>
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
            
            {this.state.count.length === this.props.keys.length - 2 ? 
            <div>
              <button>Submit Quiz</button>
            </div>
            : <span></span>}

    </Section>
    )
  }
}



export default StudentViewQuiz;