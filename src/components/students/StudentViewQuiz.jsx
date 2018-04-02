import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import data from '../../../data/quizDummyData.js'
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Label from 'grommet/components/Label';
import Title from 'grommet/components/Title';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import * as Actions from '../../actions/index.js';
import Value from 'grommet/components/Value';
import Timer from './Timer.jsx';


class StudentViewQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      arrayOfQuestionIds: [],
      enteredCurrentQuestionTime: null,
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
    
    console.log('PROPS IN StudentViwQuiz.jsx', this.props);
  }

componentDidMount() {
  this.setState({
    arrayOfQuestionIds: this.props.keys
  }, function() {
    console.log('this state',this.state)
  })
}

getDuration () {
  var now = new Date();
  const duration = now - this.state.enteredCurrentQuestionTime;
  this.setState({
    enteredCurrentQuestionTime: now
  })
  return duration;
}


forwardClick(e) {
  e.preventDefault()
  let currentQuestion = this.props.currentQuestion
  if(!this.state.count.includes(this.props.currentQuestion)) {
    this.state.count.push(this.props.currentQuestion)
  }
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)
  let duration = this.getDuration();
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]]) {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time = duration;
  }
    copy.currentQuestion++
  
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

submitQuiz(e) {
  console.log('this.state.count ------> ', this.state.count)
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)

  copy.isFinished = true

  this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

backwardClick(e) {
  e.preventDefault()
  let currentQuestion = this.props.currentQuestion
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)
  let duration = this.getDuration();
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]]) {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time = duration;
  }
    copy.currentQuestion--
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

render() {
   
    var currentQuestion = this.props.currentQuestion;
    if (currentQuestion < 0) {
      var quizView = <div>
                    <Button icon={<DeployIcon />}
                    label='Start Quiz'
                    primary={false}
                    secondary={false}
                    accent={true}
                    critical={false}
                    plain={false} 
                    onClick={(e) => this.forwardClick(e)} 
                    
                  />
              </div>
    }
    // get rid of condition that currentQuestion >=0
    else if(currentQuestion >= 0 && currentQuestion >= this.state.arrayOfQuestionIds.length) {
      var quizView = <div>
                      <Button icon={<DeployIcon />}
                        label={`Congrats, you're done! Click here to go back`}
                        primary={false}
                        secondary={false}
                        accent={true}
                        critical={false}
                        plain={false} 
                        path="/studentmainview"
                        />
                    </div>
    
    } else {
      //get rid of extra else brackets
if (currentQuestion >= 0 && currentQuestion < this.state.arrayOfQuestionIds.length) {
      var quizView = 
          <div>
            <Section pad='large'>    
                  <Header>
                    <Heading>
                      Quiz
                    </Heading>
                  </Header>
                
                  <Title>Question {currentQuestion + 1} </Title>

                    <Question question={this.props.question}
                      currentQuestionsAnswers={this.props.currentQuestionsAnswers}
                      quizResponseObj={this.props.quizResponseObj}
                      currentQuestion={currentQuestion}
                      studentId={this.props.studentId}
                      classId={this.props.classId} 
                      questionId={this.props.questionId}   
                      insertStudentAnswers={this.props.insertStudentAnswers}  
                      quizId={this.props.quizId} 
                      />
                    
                      <Box>
                        {currentQuestion > 0 ? 
                        
                        <Button label='Previous Question'
                          href='#'
                          primary={true}
                          secondary={false}
                          accent={false}
                          critical={false}
                          plain={false}
                          onClick={(e)=> this.backwardClick(e)} 
                          />
                            : <span></span>}
                          
                          {currentQuestion < this.props.keys.length -1 ? 

                        <Button label='Next Question'
                            href='#'
                            primary={true}
                            secondary={false}
                            accent={false}
                            critical={false}
                            plain={false}
                            onClick={(e)=> this.forwardClick(e)}/>
                          : <span></span>}
                        
                          {this.state.count.length === this.props.keys.length ? 
                        <div>
                            <Button 
                              label='Submit Quiz'
                              href='#'
                              primary={true}
                              secondary={false}
                              accent={false}
                              critical={false}
                              plain={false}
                              onClick={(e)=> this.submitQuiz(e)}
                          />
                        </div>
                          : <span></span>}
                      </Box>
            </Section>

          </div>
      }
    }

    return (
        <div>
          {quizView}
          <Timer
            quizEndTime={this.props.quizEndTime}
            quizDuration={this.props.quizDuration}
          />
        </div>
      )
  }
  
}

export default StudentViewQuiz;