import React, { Component } from 'react';  
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  
import { Link, withRouter } from 'react-router';  
import { loginUser } from '../actions';

const form = reduxForm({
    form: 'login'
})

class SignIn extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps)
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
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >  
              {this.renderAlert()}
                <div>
                    <label>Email</label>
                    <Field name="email" className="form-control" component="input" type="text" />
                </div>
                <div>
                    <label>Password</label>
                    <Field name="password" className="form-control" component="input" type="password" />
                </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
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