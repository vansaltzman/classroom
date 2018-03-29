import React from 'react'
import Fade from 'grommet/components/Animate';
import Heading from 'grommet/components/Heading';


class Animate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentQuestion: 'test',
      visible: true
     }
  }

  componentWillMount() {
    this.setState({currentQuestion: this.props.text})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({visible: false}, ()=> {
        setTimeout(()=> {
          this.setState({currentQuestion: nextProps.text})
          setTimeout(()=> {
            this.setState({visible: true})
          }, 280)
        }, 320)
      })
    }
  }

  render() { 

    // add a styled "is done" or "not started" 

    return ( 
        <Fade 
          visible={this.state.visible}
          enter={{"animation": "slide-right", "duration": 300, "delay": 0}}
          leave={{"animation": "slide-left", "duration": 300, "delay": 0}}
          keep={true}>
          <Heading
            tag="h4"
          >
            {this.state.currentQuestion.length >= 55 ? this.state.currentQuestion.slice(0, 55) + '...' : this.state.currentQuestion}
          </Heading>
        </Fade>
     )
  }
}
 
export default Animate;