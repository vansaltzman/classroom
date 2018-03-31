import React from "react";
import axios from "axios"
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";
import * as actions from '../../actions/index.js';


class ThumbPoll extends React.Component {
  constructor() {
    super()
    this.state = {
      test: ''
    }
  }




  render() {

    return (
      <div>
        <div style={{
          left: 0,
          lineHeight: '200px',
          marginTop: '-100px',
          position: 'absolute',
          textAlign: 'center',
          top: '50%',
          width: '100%'
        }}>

          <h1>TEST--------</h1>        

        </div>
      </div>
    )
  }
}
export default ThumbPoll;