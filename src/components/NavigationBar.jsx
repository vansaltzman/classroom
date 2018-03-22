import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import {withRouter} from 'react-router';
import App from './app.jsx';
import SignIn from './SignIn.jsx';
import QuizView from './teachers/quizView.jsx'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Router history={this.props.history} >
                <nav className="navbar navbar-default"> 
                    <div className='container-fluid'>
                        <div className="navbar-header">
                            <Link to="/" className="navbar-brand" > Classroom </Link> 
                        </div>
                        <div className="collapse navbar-collapse" >
                            <ul className="nav navbar-nav navbar-right"> 

                            <li> < Link to="/signup"> Signup </Link> </li>
                            <li> < Link to="/login"> Login </Link> </li>
                            <li> < Link to="/quiz"> Quiz </Link> </li>

                            </ul>
                        </div>
                        <Switch>
                            <Route exact path="/" component={App}  />  
                            <Route path="/login" component={SignIn}  />
                            <Route path="/quiz" component={QuizView}  />
                            
                        </Switch>
                    </div>
                </nav>
                </Router>
            </div>
        )
    }
}


export default NavigationBar;