import React from 'react'

class Animate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      textSize: '16px'
     }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({textSize: '24px'}, ()=> {
        setTimeout(()=> {
          this.setState({textSize: '16px'})
        }, 1000)
      })
    }
  }

  render() { 
    return ( 
      <span style={{fontSize: this.state.textSize}}>
        {this.props.text}
      </span>
     )
  }
}
 
export default Animate;