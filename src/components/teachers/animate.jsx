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
              lineHeight: '23px'
            }}
          >
            {'\n' + item + '\n'} 
          </code>
         )
      }
    }) 
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
            tag="div"
            style={this.state.showFull && this.state.currentQuestion.length >= 55 ? {
              overflow: 'visible',
              whiteSpace: 'normal', 
              backgroundColor: 'white',
              textOverflow: 'ellipsis', 
              height: '23px',
              width: '500px',
              minWidth: '500px',
              position: 'relative',
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
            {this.code(this.state.currentQuestion)}
          </Heading>
        </Fade>
     )
  }
}
 
export default Animate;