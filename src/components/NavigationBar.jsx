import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {withRouter, Redirect} from 'react-router';
import App from './app.jsx';
import SignIn from './SignIn.jsx';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import TeacherMainView from './teachers/mainView.jsx';
import TeacherQuizView from './teachers/quizView.jsx';
import QuizView from './teachers/quizView.jsx'
import ClassView from './teachers/classView.jsx'


import "grommet/scss/hpinc/index.scss";
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Headline from 'grommet/components/Headline';
import Anchor from 'grommet/components/Anchor';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Actions from 'grommet/components/icons/base/Action.js';
import {logoutUser} from '../actions/index.js';
 
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.checkAuth = this.checkAuth.bind(this);
        this.logout = this.logout.bind(this);
    }
    checkAuth (destination) {
        if (this.props.auth.authenticated === true) {
            if (this.props.auth.user.class === 'teacher') {
                return < Redirect to= "/teachermainview"  /> 
            }
            else {
                if (this.props.auth.user.class === 'student') {
                    return < Redirect to="/login"  /> 
                }
            }
        }
        else {
            return < SignIn /> 
        }
    }
    logout (e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render() {
        const titleStyle = {
            marginLeft: '50px'
        }
        if (!this.props.auth.authenticated) {
            var menuLabel = 'Start';
            var navBarBackground = 'lightGreen'
            var dropAnchors = 
                <div>
                    <Anchor path="/login">
                        Login 
                    </Anchor>
                    <Anchor path="/signup">
                        Signup 
                    </Anchor>
                </div>
        } else {
            if (this.props.auth.user.class === 'teacher') {
                var menuLabel = this.props.auth.user.email;
                var navBarBackground = 'lightCoral'
                var dropAnchors = 
                <div>
                    <Anchor path="/quiz">
                        Quiz 
                    </Anchor>
                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>
                </div>
            }
            if (this.props.auth.user.class === 'student') {
                var menuLabel = this.props.auth.user.email;
                var navBarBackground = 'lightBlue'
                var dropAnchors = 
                <div>
                    <Anchor path="/quiz">
                        Quiz 
                    </Anchor>
                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>
                </div>
            }
        }
        return (
        <div>
            <Router history={this.props.history} >
                <nav className="navbar navbar-default"> 

            <Header
                style={{background: navBarBackground}}
                size='medium'>
                <Headline margin='large' style={titleStyle} primary={true} >
                    Jaqen
                </Headline>
                <Box flex={true}
                    margin='large'
                    justify='end'
                    direction='row'
                    responsive={false}>
                    <Menu 
                        primary={false}
                        direction='row'
                        label={menuLabel}
                        icon={<Actions/>}>
                        {dropAnchors}
                    </Menu>
                </Box>
            </Header>

        
                        <Switch>
                            <Route path="/teachermainview" component={TeacherMainView} />
                            {/* <Route path="/studentmainview" component={TeacherMainView} /> */}
                            <Route exact path="/login"  render={
                                    this.checkAuth
                            } />  
                            <Route path="/login" component={SignIn}  />
                            <Route path="/teacherQuiz" component={ClassView}  />
                            <Route path="/quiz" component={QuizView}  />
                            
                        </Switch>
                </nav>
                </Router>

            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
          // subject to change
          auth: state.auth
      }
  }
  
  function matchDispatchToProps(dispatch) {
      return bindActionCreators(actions, dispatch);
  }
  
  export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar)


// export default NavigationBar;