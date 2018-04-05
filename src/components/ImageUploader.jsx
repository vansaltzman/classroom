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
import Split from 'grommet/components/Split';
import Anchor from 'grommet/components/Anchor';
import Pulse from 'grommet/components/icons/Pulse';




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
    data.append('classPic', false)

    this.props.getLinkFroms3( data )    

    // axios.post('/imageUploader', data)
    //   .then((response) => {
    //     this.setState({image: response.data})
    //     this.props.updateProfilePic( response.data )
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }


  render() {
    const dpStyle={
    margin: 'auto',
    height: '75px',
    width:'150px',
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
      marginTop: '100px',
      borderRadius: '50%',
      textAlign: 'center',

      
    }

    const mainDiv={
      marginRight: '100px', 
      marginLeft: '100px'
    }
    return(
<div style={mainDiv}>
<Split separator={false}>

  <Box colorIndex='light-1' justify='center' align='center' pad='medium'>
    <Section>
      <Paragraph size='xlarge' style={title}>
        Click or Drag and Drop an Image Here!
      </Paragraph>
      <Box direction='row' justify='start' align='center' wrap={true} pad='medium' margin='small'>
        <Dropzone onDrop={this.onDrop} size={100} style={dpStyle}>
          <Anchor icon={<DocumentImage size="xlarge"/>}
          />
        </Dropzone>
      </Box>
    </Section>
  </Box>



  <Box colorIndex='light-1' justify='center' align='center' pad='medium'>
    <Section>
    <Paragraph size='xlarge' style={title}>
      Profile Preview
      </Paragraph>
      <Box direction='row' justify='start' align='center' wrap={true} pad='medium' margin='small' style={preview}>
        <Image src={this.props.auth.user.pic.length> 0 ? this.props.auth.user.pic : 'https://s3.us-east-2.amazonaws.com/jaqen-app/default-profile.png'} full={false} style={imgStyle}
          alt={''} fit='contain'/>
      </Box>
    </Section>
  </Box>
</Split>
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

export default connect(mapStateToProps, matchDispatchToProps)(ImageUploader);






  