import React from 'react';
import axios from 'axios';
import Form from 'grommet/components/Form'
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Dropzone from 'react-dropzone';
import Section from 'grommet/components/Section';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../../actions/index.js';
import Image from 'grommet/components/Image';
import Quote from 'grommet/components/Quote';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';
import Add from 'grommet/components/icons/base/add';
import DocumentImage from 'grommet/components/icons/base/documentimage'
import Label from 'grommet/components/Label';


class ClassImageUploader extends React.Component {
  constructor() {
    super();
    this.state = {
      image: ''
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    let data = new FormData()
    data.append('file', files[0]);
    data.append('text', this.props.auth.user.id)
    data.append('classPic', true)

    axios.post('/imageUploader', data)
      .then((response) => {
        this.setState({image: response.data})
      })
      .catch((error) => {
        console.log(error)
      })
  }

render() {
  const dpStyle={
    margin: 'auto',
    height: '75px',
    width:'150px',
    padding: '10px',
    textAlign: 'center',
    margin:'auto',
    display:'inline'
  }
  const imgStyle={ 
    height: '40px',
    width: '40px',
    marginLeft: '50px',
    padding: '0'

  }
  const box={
    borderBottom: '2px solid lightGrey',
    padding: '13px'
  }
  const iconStyle={
    float: 'right',
    verticalAlign: 'middle',
    marginRight: '6px',
    // position: 'relative',
    display: 'inline'
  }
  const labelStyle={
    color: 'lightGrey',
    fontSize: '17px',
    // marginLeft: '3px'
  }

  return (
    <div style={box}>
      <Dropzone onDrop={this.onDrop} style={dpStyle}>
      <Label style={labelStyle}>Click or Drag and Drop an Image Here!
        
          <img src={this.state.image} style={imgStyle} alt={''}/>
            <DocumentImage size="small"  style={iconStyle}>
            </DocumentImage>
    
      </Label>
      </Dropzone>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ClassImageUploader);






  