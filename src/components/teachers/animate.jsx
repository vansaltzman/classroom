import React from 'react'
import Fade from 'grommet/components/Animate';


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
    return ( 
        <Fade 
          visible={this.state.visible}
          enter={{"animation": "slide-right", "duration": 300, "delay": 0}}
          leave={{"animation": "slide-left", "duration": 300, "delay": 0}}
          keep={true}>
          <span>
            {this.state.currentQuestion}
          </span>
        </Fade>
     )
  }
}
 
export default Animate;