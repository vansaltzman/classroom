import React from 'react';
import ListItem from 'grommet/components/ListItem';
import CheckBox from 'grommet/components/CheckBox';



class Answers extends React.Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    console.log('this.props in answers', this.props)
  }

  handleChange(e) {    
    let copy = Object.assign({}, this.props.quizResponseObj)
      copy.responses[this.props.questionId].answers[this.props.answerNum] = !copy.responses[this.props.questionId].answers[this.props.answerNum]
        this.props.insertStudentAnswers(copy, this.props.studentId, this.props.quizId, this.props.classId)
  }

  code = function(text) {
    return text.split('~~~').map((item, i)=> {
      if (i % 2 === 0) {
        return item
      } else {
        // return (
        // <SyntaxHighlighter language='javascript' style={syntaxStyle} >
        //   {'\n' + text  + '\n'}
        // </SyntaxHighlighter>
        // )
         return (
           <code
            style={{
              fontFamily: 'Monaco,Menlo,Consolas,"Courier New",monospace!important',
              fontSize: '0.9rem',
              whiteSpace: 'normal',
              color: '#7026d2',
              padding: '2px 3px 1px',
              tabSize: '4',
              backgroundColor: '#f7f7f9',
              border: '1px solid #e1e1e8',
              borderRadius: '3px',
              lineHeight: '2'
            }}
          >
            {'\n' + item + '\n'} 
          </code>
         )
      }
    }) 
  }

render() {
  return (
    
        <ListItem separator='horizontal' justify='between'>
          
          <span>
             {this.props.answerNum + ' )'} {this.code(this.props.answersText[this.props.answerNum].text)}
          </span>
                
          <span className='secondary'>     
                <CheckBox type="checkbox" 
                  name="answer" 
                  checked={this.props.currentQuestionsAnswers[this.props.answerNum]}
                  onChange={(e) => this.handleChange(e)}/>
            </span>
            
          
        
        </ListItem>
    
    )
  }
}
export default Answers;