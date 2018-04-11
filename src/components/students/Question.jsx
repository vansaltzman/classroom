import React from 'react';
import Answers from './Answers.jsx'
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
// import Tile from 'grommet/components/Tile';
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Animate from 'grommet/components/Animate';

import SyntaxHighlighter from 'react-syntax-highlighter';
import syntaxStyle from 'react-syntax-highlighter/styles/hljs/github-gist.js';


import format from '../../utils/formatter.jsx'

class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  code = function(text) {
    return text.split('~~~').map((item, i)=> {
      if (i % 2 === 0) {
        return item
      } else {
        return (
        <SyntaxHighlighter language='javascript' style={syntaxStyle} wrapLines={true} >
          {'\n' + item  + '\n'}
        </SyntaxHighlighter>
        )
        //  return (
        //    <code
        //     style={{
        //       fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace!important',
        //       fontSize: '0.9rem',
        //       whiteSpace: 'normal',
        //       color: '#7026d2',
        //       padding: '2px 3px 1px',
        //       tabSize: '4',
        //       backgroundColor: '#f7f7f9',
        //       border: '1px solid #e1e1e8',
        //       borderRadius: '3px',
        //       lineHeight: '2'
        //     }}
        //   >
        //     {'\n' + item + '\n'} 
        //   </code>
        //  )
      }
    }) 
  }
 
  
render() {
   let answerArray = Object.keys(this.props.currentQuestionsAnswers)
  return (
    <Section >
        <Animate enter={{"animation": "fade", "duration": 1000, "delay": 0}}keep={true}>
          <Label>

              {this.code(this.props.question.text)}                
            
          </Label>
        
          <List>
              <ol>
                {answerArray.map((answerNum, i) => (
                <Answers key={i} 
                  answersText={this.props.question.answers}
                  answerNum={answerNum} 
                  currentQuestionsAnswers={this.props.currentQuestionsAnswers}
                  questionId={this.props.questionId}
                  quizResponseObj={this.props.quizResponseObj}
                  currentQuestion={this.props.currentQuestion}
                  studentId={this.props.studentId}
                  classId={this.props.classId}
                  insertStudentAnswers={this.props.insertStudentAnswers}
                  quizId={this.props.quizId}            
          
                />
                ))}
              </ol>
        </List>
      </Animate>
       
     </Section>
  )
}
}

const questionCSS = {border: 'solid'}

export default Question;

