import React from 'react';
import Card from 'grommet/components/Card';
import Tile from 'grommet/components/Tile';
import Button from 'grommet/components/Button';
import * as Actions from '../../actions/index.js';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class ClassLabel extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
	//	console.log('target classsss', item);
		return (
			<Tile>
				<Card thumbnail={this.props.item.thunmbnail}
					label={this.props.item.year}
					heading={this.props.item.name}
					description='Sample description providing more details.' />
				<Button label="Enter Class" 
						type="button"
						path='/liveclass' 
						primary={true} 
						onClick={() => this.props.clickHandler(this.props.item)}/>
			</Tile>
		)
	}
}

export default ClassLabel

// function matchDispatchToProps(dispatch) {
// 	return bindActionCreators(Actions, dispatch);
// }

// export default connect(matchDispatchToProps)(ClassLabel)

//need an action to enter class and get class information