import React from 'react';
import axios from 'axios';
import Form from 'grommet/components/Form'
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Button from 'grommet/components/Button';
import FormField from 'grommet/components/FormField';
import TextInput from 'grommet/components/TextInput';
import Dropzone from 'react-dropzone';
import Section from 'grommet/components/Section';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from '../actions/index.js';


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
    console.log('this.props.auth', this.props.auth)
    return(
      <Section> 

        <Dropzone onDrop={this.onDrop} size={150}>
            Drop Here!
        </Dropzone>

        <div >test<img src={this.state.image} /></div>
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






  