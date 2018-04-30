import React from 'react';
import Value from 'grommet/components/Value';
import moment from 'moment'

class QuestionTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
        }
        this.timerTick = this.timerTick.bind(this);
    }
    componentDidMount () {
        this.timer = setInterval(
            () => this.timerTick (), 1000
          )
    }
    componentWillUnmount () {
        clearInterval(this.timer);
    }

    timerTick () {
        this.setState({
        currentTime: new Date()
        }, ()=> {
            this.setState({
                timeLeft: this.props.quizEndTime * 1000 - (this.state.currentTime.getTime())
            })
        })
    }
    render() {

      const { duration, entered } = this.props
      console.log('duration, entered ------> ', duration, this.state.currentTime.getTime() - entered)

      // studentQuiz && studentQuiz.currentQuestion >= 0 ?

       return (
        <div style={{marginTop: '-8px'}}>
          <Value 
            size="medium"
            value={moment.duration(duration + (this.state.currentTime.getTime() - entered)).minutes()}
            responsive={false} />
          <Value 
            size="medium"
            value={':'}
            responsive={false} />
          <Value 
            size="medium"
            value={
                moment.duration(duration + (this.state.currentTime.getTime() - entered)).seconds().toString().length < 2 ?
                '0' + moment.duration(duration + (this.state.currentTime.getTime() - entered)).seconds() : 
                moment.duration(duration + (this.state.currentTime.getTime() - entered)).seconds()}
            responsive={false} />
        </div>
  )
    }
 }

 export default QuestionTime;