import React from "react";
import Card from "grommet/components/Card";
import Tile from "grommet/components/Tile";
import Button from "grommet/components/Button";
import * as Actions from "../../actions/index.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const StudentClassLabel = (props) => {
  return (
    //   <div>students</div>
    <Tile>
      <Card
        thumbnail={props.item.thunmbnail}
        label={props.item.year}
        heading={props.item.name}
        description="Sample description providing more details."
      />
      <Button
        label="Enter Class"
        type="button"
        path="/studentliveclass"
        primary={true}
        onClick={() => props.clickHandler(props.item)}
      />
    </Tile>
  );
};

export default StudentClassLabel;
