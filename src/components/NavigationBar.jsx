import React from "react";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import App from "./app.jsx";
import SignIn from "./SignIn.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/index";
import TeacherMainView from "./teachers/mainView.jsx";
import StudentMainView from "./students/studentMainView.jsx";
import ClassView from "./teachers/classView.jsx";
import Headline from "grommet/components/Headline";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Box from "grommet/components/Box";
import Actions from "grommet/components/icons/base/Actions.js";
import quizViewContainer from "./teachers/quizViewContainer.jsx";
import SignUp from './SignUp.jsx';
import StudentViewQuiz from './students/StudentViewQuiz.jsx'
import quizContainer from './students/quizContainer.jsx'
import StudentLiveClassView from './students/studentLiveClassView.jsx'
import ClassViewDefault from './students/classViewDefault.jsx';
import ClassViewContainer from './teachers/classViewContainer.jsx';
// import StudentLiveClassView from "./students/studentLiveClassView.jsx";
import ImageUploader from './ImageUploader.jsx';
import ProfilePic from './students/ProfilePic.jsx';
import ThumbPoll from './teachers/thumbPoll.jsx';
import ThumbVote from './students/thumbVote.jsx';
import Statistics from './teachers/statistics.jsx';
import Image from 'grommet/components/Image';




import { readdir } from "fs";

import "grommet/scss/hpinc/index.scss";
import { logoutUser } from "../actions/index.js";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
    this.checkView = this.checkView.bind(this);
    this.logout = this.logout.bind(this);
    this.goToNewClass = this.goToNewClass.bind(this);
  }
  checkView() {
    return <Redirect to="/default"/>
  }

  goToNewClass() {
    return <Redirect to="/liveclass"/>
  }
  
  checkAuth() {
    if (this.props.auth.authenticated === true) {
      if (this.props.auth.user.class === "teacher") {
        return <Redirect to="/teachermainview" />;
      } else {
        if (this.props.auth.user.class === "student") {
          return <Redirect to="/studentmainview" />;
        }
      }
    } else {
      return <SignIn />;
    }
}

    logout (e) {
        e.preventDefault();
        this.props.logoutUser();
    }
    
    render() {


        
        if (!this.props.auth.authenticated) {
            var menuLabel = 'Start';
            var navBarBackground = '#ffd602'
            var dropAnchors = 
                <div style={{marginTop: '38px', zIndex:'9999'}}>
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
                var navBarBackground = '#5b92cb';
                var dropAnchors = 
                <div style={{marginTop: '38px', zIndex:'9999'}}>

                    <Anchor path='/classViewContainer'>
                    Quiz View
                    </Anchor>
                  
                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>
                </div>
            }
            if (this.props.auth.user.class === 'student') {
                var menuLabel = this.props.auth.user.email;
                var navBarBackground = '#ffd602'
            var pic = <ProfilePic userId={this.props.auth.user.id}/>
                var dropAnchors = 
                <div style={{marginTop: '38px', zIndex:'10'}}>
                    <Anchor path='/login' onClick={this.logout}>
                        Logout
                    </Anchor>


                    {/* <Anchor path='/studentQuiz'>
                        studentQuiz
                    </Anchor> */}

                    <Anchor path='/profileSettings'>
                            Profile Pic
                    </Anchor>

                </div>
            }
        }
        const titleStyle = {
            marginLeft: '50px'
        }
        return (
        <div>
            <Router history={this.props.history} >
                <nav className="navbar navbar-default"> 

            <Header
                fixed={false}
                style={{background: navBarBackground}}
                size='small'>
                <Box direction='row' align='center'> 
                    <Headline 
                    margin='medium'
                    style={titleStyle} 
                    primary={true} 
                    >
                    Jaqen
                        
                    </Headline>
                    <img 
                        src='https://cdn3.iconfinder.com/data/icons/othericons-3-0/50/pencil-512.png' 
                        alt='' 
                        style={{height:'60px'}}
                    />
                    </Box>
                <Box flex={true}
                    margin='medium'
                    justify='end'
                    direction='row'
                    >
                   {pic}
                <Menu 
                  primary={false}
                  label={menuLabel}
                  // icon={<Actions/>}
                  >
                  {dropAnchors}
                </Menu>
                </Box>
            </Header>
        
                        <Switch>
                        <Route exact path="/"  render={
                                    this.checkAuth
                            } /> 
                            <Route path="/teachermainview" component={TeacherMainView} />
                            {/* <Route path="/studentmainview" component={TeacherMainView} /> */}
                            <Route exact path="/login"  render={
                                    this.checkAuth
                            } />  
                            <Route path="/liveclass" component={ClassViewContainer}/>
                            <Route path="/studentmainview" component={StudentMainView} />
                            <Route path="/login" component={SignIn}  />
                            <Route path="/teacherQuiz" component={ClassView}  />
                            <Route path="/quizViewContainer" component={quizViewContainer}  />
                        
                            <Route path="/classViewContainer" component={ClassViewContainer}  />
                            <Route path="/studentQuiz" component={quizContainer}/>
                            <Route path="/studentliveclass" component={StudentLiveClassView}/>
                            <Route path="/signUp" component={SignUp}/>
                            <Route path="/default" component={ClassViewDefault}/>
                            <Route path="/profileSettings" component={ImageUploader}/>
                            {/* <Route path="/thumb" component={ThumbPoll}/> */}
                            {/* <Route path="/thumbvote" component={ThumbVote}/> */}
                        
                            <Route path="/statistics" component={Statistics}/>
                            

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
    auth: state.auth,
    activeView: state.teachersClassView.targetClass.activeView,
    studentClassView: state.studentClassView,
    teachersClassView: state.teachersClassView
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);

// export default NavigationBar;
