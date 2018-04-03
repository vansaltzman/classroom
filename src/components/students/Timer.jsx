import React from 'react';
import Meter from 'grommet/components/Meter';
import Value from 'grommet/components/Value';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import moment from 'moment'

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTime: new Date(),
            timeLeft: 'calculating quiz time'
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
        let seconds = moment.duration(this.state.timeLeft).seconds().toString().length < 2 ? 
        '0' + moment.duration(this.state.timeLeft).seconds().toString() 
        : moment.duration(this.state.timeLeft).seconds().toString()
        
        let timeLeft = this.state.timeLeft > 0 ?  moment.duration(this.state.timeLeft).minutes() + ':' + seconds : '0:00'
        let quizDuration = this.props.quizDuration * 1000;

        if (this.state.timeLeft/quizDuration >= .40) {
            var meterColor = 'neutral-1'
        }  
        else if (this.state.timeLeft/quizDuration >= .15 ) {
            var meterColor = 'accent-2'
        }  else  {
            var meterColor = 'accent-1'
        }
        return (
            <div>
                {/* <Section 
                    justify='center'
                    align='center'>
                    <Heading>
                        Time
                    </Heading> */}
                    <Meter size='xsmall'
                        type='circle'
                        label={<Value value={timeLeft}
                        size='xsmall' />}
                        max={quizDuration}
                        value={this.state.timeLeft}
                        colorIndex={meterColor}
                    />
                {/* </Section> */}
            </div>
        )
    }
 }

 export default Timer;