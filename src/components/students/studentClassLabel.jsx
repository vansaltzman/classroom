import React from "react";
import Card from "grommet/components/Card";
import Tile from "grommet/components/Tile";
import Button from "grommet/components/Button";
import * as Actions from "../../actions/index.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class StudentClassLabel extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Tile>
      <Card
        style={{background: this.props.item.color}}
        thumbnail={this.props.item.thunmbnail}
        label={this.props.item.year}
        heading={this.props.item.name}
        description="Sample description providing more details."
      />
      <Button
        label="Enter Class"
        type="button"
        path="/studentliveclass"
        primary={true}
        onClick={() => this.props.clickHandler(this.props.item)}
      />
      </Tile>
    )
  }
}


export default StudentClassLabel;
