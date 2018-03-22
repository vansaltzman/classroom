import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { withRouter, Redirect } from "react-router";
import App from "./app.jsx";
import SignIn from "./SignIn.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/index";
import TeacherMainView from "./teachers/mainView.jsx";
import StudentMainView from "./students/studentMainView.jsx";
import ClassView from "./teachers/classView.jsx";

import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Anchor from "grommet/components/Anchor";
import Menu from "grommet/components/Menu";
import Box from "grommet/components/Box";
import Actions from "grommet/components/icons/base/Action.js";

import { readdir } from "fs";

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth = this.checkAuth.bind(this);
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
  render() {
    // NOTE: to input a grommet navbar here instead of our ugly ul
    // console.log('auth ', this.props.auth)
    return (
      <div>
        <Header fixed={true} size="large">
          <Title>Sample Title</Title>
          <Box flex={true} justify="end" direction="row" responsive={false}>
            <Menu icon={<Actions />} dropAlign={{ right: "right" }}>
              <Anchor href="#" className="active">
                First
              </Anchor>
              <Anchor href="#">Second</Anchor>
              <Anchor href="#">Third</Anchor>
            </Menu>
          </Box>
        </Header>

        <div>
          <Router history={this.props.history}>
            <nav className="navbar navbar-default">
              <Link to="/" className="navbar-brand">
                {" "}
                Classroom{" "}
              </Link>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  {" "}
                  <Link to="/signup"> Signup </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link to="/login"> Login </Link>{" "}
                </li>
              </ul>
              <Switch>
                <Route path="/liveclass" component={ClassView} />
                <Route path="/teachermainview" component={TeacherMainView} />
								<Route path="/studentmainview" component={StudentMainView} />
                {/* <Route path="/studentmainview" component={TeacherMainView} /> */}
                <Route exact path="/login" render={this.checkAuth} />
                <Route path="/login" component={SignIn} />
              </Switch>
            </nav>
          </Router>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    // subject to change
    auth: state.auth
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NavigationBar);

// export default NavigationBar;
