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

render() {
  return (
    
        <ListItem separator='horizontal' justify='between'>
          
          <span>
             {this.props.answerNum + ' )'} {this.props.answersText[this.props.answerNum].text}
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