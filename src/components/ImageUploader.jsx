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
import * as Actions from '../actions/index.js';
import Image from 'grommet/components/Image';
import Quote from 'grommet/components/Quote';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Title from 'grommet/components/Title';
import Paragraph from 'grommet/components/Paragraph';
import Add from 'grommet/components/icons/base/add';
import DocumentImage from 'grommet/components/icons/base/documentimage'

class ImageUploader extends React.Component {
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
    // width: '100%',
    // maxHeight: '100%',
    // maxHeight: '100%',
    height: '75px',
    width:'150px',
    // border: '3px dashed grey',
    padding: '10px',
    textAlign: 'center',
    margin:'auto',
    display:'block'
    }

    const preview={
      margin: 'auto', 
      borderRadius: '50%',
      height: '150px',
      width: '150px',
      padding: '30px'
    }
    const title={margin:'auto', textAlign: 'center', padding: '30px'}

    const imgStyle={ 
      // position: 'relative',
      // margin: 'auto',
      borderRadius: '50%',
      // maxHeight: '100px',
      // maxHeight: '100px',
      textAlign: 'center',
      // display:'block'
      
    }
    console.log('this.props.auth', this.props.auth)
    return(
<Section>



<Paragraph size='xlarge' style={title}>
Click or Drag and Drop an Image Here!
</Paragraph>
  <Box direction='row' justify='start' align='center' wrap={true} pad='medium' margin='small'>
    <Dropzone onDrop={this.onDrop} size={100} style={dpStyle}>
      <DocumentImage size="xlarge" >
      </DocumentImage>
    </Dropzone>
  </Box>

  <Section>
    <Box direction='row' justify='start' align='center' wrap={true} pad='medium' margin='small' style={preview}>
      <Image src={this.state.image} full={false} style={imgStyle} alt={''} fit='contain'/>
        <Paragraph size='medium' style={title}>
          Profile Preview
        </Paragraph>
    </Box>
  </Section>
</Section>
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

export default connect(mapStateToProps, matchDispatchToProps)(ImageUploader);






  