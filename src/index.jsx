import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp.jsx'

class App extends React.Component {
    constructor(){
        super();
        this.state = {
            test: ''
        }
    }

render() {
    return(
        <div> test test test 
        <SignUp />
        </div>
    )
}
}
ReactDOM.render(<App/>, document.getElementById('app'));
