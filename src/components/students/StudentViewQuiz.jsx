import React from 'react';
import axios from 'axios';
import Question from './Question.jsx';
import data from '../../../data/quizDummyData.js'
import Header from 'grommet/components/Header';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import Anchor from 'grommet/components/Anchor';
import DocumentUploadIcon from 'grommet/components/icons/base/DocumentUpload';
import DeployIcon from 'grommet/components/icons/base/Deploy';
import Section from 'grommet/components/Section';
import Box from 'grommet/components/Box';
import Columns from 'grommet/components/Columns';
import Label from 'grommet/components/Label';
import Title from 'grommet/components/Title';
import * as Actions from '../../actions/index.js';
import Value from 'grommet/components/Value';
import Timer from './Timer.jsx';


class StudentViewQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [],
      arrayOfQuestionIds: [],
      enteredCurrentQuestionTime: new Date(),
    }
    this.forwardClick = this.forwardClick.bind(this)
    this.backwardClick = this.backwardClick.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.submitQuiz = this.submitQuiz.bind(this);
  }

componentDidMount() {
  this.setState({
    arrayOfQuestionIds: this.props.keys
  }, function() {
  })
}

getDuration () {
  var now = new Date();
  return now.getTime();
}


forwardClick(e) {
  e.preventDefault()
  let currentQuestion = this.props.currentQuestion
  if(!this.state.count.includes(this.props.currentQuestion)) {
    this.state.count.push(this.props.currentQuestion)
  }
  let quizResponseObj = this.props.quizResponseObj
  let copy = Object.assign({}, quizResponseObj)
  let now = this.getDuration();
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]]) {
   if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time) {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time += now - copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].entered
   } else {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time = now - copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].entered
   }
  }
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion + 1]]) {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion + 1]].entered = now
  }
  copy.currentQuestion++
  if(copy.currentQuestion === this.state.arrayOfQuestionIds.length - 1) {
    copy.canSubmit = true
  }
  
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

submitQuiz(e) {
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
  let now = this.getDuration();
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]]) {
    if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time) {
      copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time += now - copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].entered
     } else {
      copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].time = now - copy.responses[this.state.arrayOfQuestionIds[currentQuestion]].entered
     }
  }
  if(copy.responses[this.state.arrayOfQuestionIds[currentQuestion - 1]]) {
    copy.responses[this.state.arrayOfQuestionIds[currentQuestion - 1]].entered = now
  }
    copy.currentQuestion--
    this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
}

render() {
   
    var currentQuestion = this.props.currentQuestion;
    // get rid of condition that currentQuestion >=0
     if(currentQuestion >= 0 && currentQuestion >= this.state.arrayOfQuestionIds.length) {
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
                    
                      <Box
                        direction="row"
                        full="true"
                        justify="between"
                      >
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
                      </Box>
            </Section>

          </div>
      }
    }

    return (
        <div>
          <Box
              direction="row"
              full="true"
              justify="between"
              alignContent="center"
              margin="small"
              pad="small"
              colorIndex="light-2"
              style={{margin: '0', top: '112px', zIndex: '2'}}
            >
              {this.props.currentQuestion < 0 ? 
              <Anchor 
                icon={<DeployIcon size="large" />}
                label='Start'
                primary={false}
                style={{lineHeight: '100px', marginLeft: "10px", width: '124.39px'}}
                onClick={(e) => this.forwardClick(e)}
              /> :
              this.props.quizResponseObj.canSubmit && !this.props.quizResponseObj.isFinished ?
              <Anchor 
                icon={<DocumentUploadIcon size="large" />}
                label='Submit'
                primary={false}
                style={{lineHeight: '100px', marginLeft: "10px"}}
                onClick={(e)=> this.submitQuiz(e)}
              /> :
              <div style={{width: '124.39px', marginLeft: '10px'}}
              >
              </div>
              }
              <Headline
                style={{marginBottom: 0, lineHeight: '100px'}}
              >
                {this.props.quizName}
              </Headline>
              <Timer
                quizEndTime={this.props.quizEndTime}
                quizDuration={this.props.quizDuration}
              />
            </Box>
          {this.props.quizResponseObj.isFinished ? 
          <div style={{
            left: 0,
            lineHeight: '200px',
            marginTop: '100px',
            position: 'relative',
            textAlign: 'center',
            top: '50%',
            width: '100%'
          }}>
            <Heading align="center">
        
             Thanks for submitting your quiz! 😄
        
            </Heading>
      
            {/* Button should link to prev student quiz data */}
            <Button label='View Quizzes'
              onClick={this.props.toggleGrades}
              accent={true} 
            />
          </div>
          : quizView}
        </div>
      )
  }
  
}

export default StudentViewQuiz;