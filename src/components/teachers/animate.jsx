import React from 'react'
import Fade from 'grommet/components/Animate';
import Heading from 'grommet/components/Heading';


class Animate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentQuestion: 'test',
      visible: true,
      showFull: false
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
            style={this.state.showFull && this.state.currentQuestion.length >= 55 ? {
              overflow: 'visible',
              whiteSpace: 'normal', 
              backgroundColor: 'white',
              textOverflow: 'ellipsis', 
              height: '23px',
              width: '500px', 
              position: 'absolute',
              display: 'inline-block',
              lineHeight: '23px',
              zIndex: '999',
              cursor: 'default'
            }: 
            {
              overflow: 'hidden', 
              whiteSpace: 'nowrap', 
              textOverflow: 'ellipsis', 
              height: '23px', 
              width: '500px', 
              display: 'inline-block',
              lineHeight: '23px',
            }
            }
            onMouseEnter ={()=> this.setState({showFull: true})}
            onMouseLeave ={()=> this.setState({showFull: false})}
          >
            {this.state.currentQuestion}
          </Heading>
        </Fade>
     )
  }
}
 
export default Animate;