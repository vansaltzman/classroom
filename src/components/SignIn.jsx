import React, { Component } from 'react';  
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  
import { Link, withRouter } from 'react-router';  
import { loginUser } from '../actions';
import LoginForm from 'grommet/components/LoginForm';

import Article from 'grommet/components/Article';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/HeadLine';
import Button from 'grommet/components/Button';
import PasswordInput from 'grommet/components/PasswordInput';

const form = reduxForm({
    form: 'login'
})

class SignIn extends Component {
    handleFormSubmit(formProps) {
        console.log('is this running ', formProps)
        // this.props.loginUser(formProps)
    }
    renderAlert() {
        if(this.props.errorMessage) {
            return (
            <div> <h1>error</h1> </div>
        )
        }
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <Article>
                    <Section pad='large'
                        justify='center'
                        align='center'>
                        <Headline margin='medium'>
                        Login
                        </Headline>
                        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >  
                            {this.renderAlert()}
                            <div>
                                <label>Email</label>
                                <Field name="email" className="form-control" component="input" type="text" />
                            </div>
                            <div>
                                <label>Password</label>
                                <Field name="password" className="form-control" component="input" type="password" />
                                {/* <PasswordInput />  */}
                            </div>
                            <Button label='Submit'
                                primary={false}
                                secondary={false}
                                accent={true}
                                critical={false}
                                plain={true}
                                type='reset' />
                            {/* <button type="submit" className="btn btn-primary">Login</button> */}
                        </form>
                    </Section>
                    
                </Article>
               
            
            </div>
        )
    }
}

function mapStateToProps(state) {  
    return {
      errorMessage: state.auth.error,
      message: state.auth.message
    };
  }
  
export default withRouter(connect(mapStateToProps, { loginUser })(form(SignIn)));