import React from "react";
import ClassLabel from "./classLabel.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import ClassLabel from './classLabel.jsx';
import * as Actions from "../../actions/index.js";
//import ClassBuilderModal from './classBuilderModal';
import axios from "axios";
/****** Grommet Stuff ******/
import "grommet/scss/hpinc/index.scss";
import GrommetApp from "grommet/components/App";
import Header from "grommet/components/Header";
import Title from "grommet/components/Title";
import Box from "grommet/components/Box";
import Search from "grommet/components/Search";
import Menu from "grommet/components/Menu";
import MenuIcon from "grommet/components/icons/base/Menu";
import Anchor from "grommet/components/Anchor";
import Hero from "grommet/components/Hero";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import Button from "grommet/components/Button";
import Tiles from "grommet/components/Tiles";
import Tile from "grommet/components/Tile";
import Section from "grommet/components/Section";
import AddCircleIcon from "grommet/components/icons/base/AddCircle";
import Layer from "grommet/components/Layer";
import Form from "grommet/components/Form";
import Footer from "grommet/components/Footer";
import FormFields from "grommet/components/FormFields";
import TextInput from "grommet/components/TextInput";
import Select from "grommet/components/Select";
import SearchInput from "grommet/components/SearchInput";
import ClassImageUploader from './classImageUploader.jsx'
// import Header from 'grommet/components/Header'

/****** Grommet Stuff ******/

class TeacherMainView extends React.Component {
  constructor() {
    super();
    this.toggleModalHandler = this.toggleModalHandler.bind(this);
    this.newClassNameChangeHandler = this.newClassNameChangeHandler.bind(this);
    this.newClassSubjectChangeHandler = this.newClassSubjectChangeHandler.bind(
      this
    );
    this.newClassQuarterChangeHandler = this.newClassQuarterChangeHandler.bind(
      this
    );
    this.newClassYearChangeHandler = this.newClassYearChangeHandler.bind(this);
    this.getClassesfromDb = this.getClassesfromDb.bind(this);
    this.updateTargetClass = this.updateTargetClass.bind(this);
  }

  componentWillMount() {
    //console.log(this.props.auth.user.email)
		this.getClassesfromDb();
		this.props.getAllExistingSubjects();
  }
  componentWillUnmount() {
    this.getClassesfromDb();
  }

  getClassesfromDb() {
    this.props.getClasses({ email: this.props.auth.user.email });
  }

  toggleModalHandler() {
    this.props.toggleModalAction();
  }

  newClassNameChangeHandler(value) {
    this.props.updateNewClassName(value);
  }

  newClassSubjectChangeHandler(value) {
    this.props.updateNewClassSubject(value);
  }

  newClassQuarterChangeHandler(value) {
    this.props.updateNewClassQuarter(value);
  }

  newClassYearChangeHandler(value) {
    this.props.updateNewClassYear(value);
  }

  updateTargetClass(target) {
    this.props.updateTargetClass(target);
  }

  addClassHandler() {
    console.log("email", this.props.auth.user.email);
    this.props.addNewClass({
      email: this.props.auth.user.email,
      classname: this.props.newClassName,
      subject: this.props.newClassSubject,
      year: this.props.newClassYear,
      quarter: this.props.newClassQuarter,
      thumbnail:
        "https://regmedia.co.uk/2016/10/17/javascript_photo_via_shutterstock.jpg?x=442&y=293&crop=1"
    })
  }

  render() {

    return (
      <div>
        <Tiles flush={false} selectable={true}>
          {/* onSelect some function */}
          {this.props.classes.map((item, index) => {
            return (
              <ClassLabel
                item={item}
                key={index}
                clickHandler={this.updateTargetClass}
              />
            );
          })}
          <Tile label="Label" href="#">
            <Button
              icon={
                <AddCircleIcon
                  size="huge"
                  onClick={() => this.toggleModalHandler()}
                />
              }
            />
            {/* onClick={...} */}
          </Tile>
        </Tiles>
        {this.props.showClassBuilderModal === true ? (
          <Layer
            closer={true}
            flush={true}
            overlayClose={true}
            onClose={this.toggleModalHandler}
          >
            {/* // onClose={...}>
					// <t onCancel={...} */}
            {/* //   onSubmit={...}  */}
            <Form>
              <Header pad={{ vertical: "medium", horizontal: "medium" }}>
                Make A New Class
              </Header>
              <FormFields pad={{ horizontal: "medium" }}>
                <TextInput
                  placeHolder="Please Enter Class Name"
                  onDOMChange={value => {
                    this.newClassNameChangeHandler(value);
                  }}
                  value={this.props.newClassName}
                />
                <SearchInput
                  placeHolder="Please Enter A Subject"
                  suggestions={this.props.subjects}
                  onDOMChange={(value) => {this.newClassSubjectChangeHandler(value)}}
                  onSelect={target => {this.props.selectExistingSubjectToAdd(target)}}
                />
                {/* <TextInput placeHolder="Please Enter Class's Subject" 
												 onDOMChange={(value) => {this.newClassSubjectChangeHandler(value)}}
												 value={this.props.newClassSubject}/> */}
                <Select
                  placeHolder="Select School Year"
                  inline={false}
                  multiple={true}
                  // onSearch={false}
                  options={["2018", "2019", "2020", "2021", "2022"]}
                  value={this.props.newClassYear}
                  onChange={value => this.newClassYearChangeHandler(value)}
                />
                {/* // onChange={...} /> */}
                <Select
                  placeHolder="Select Quarter"
                  inline={false}
                  multiple={false}
                  options={["First", "Second", "Third", "Fourth"]}
                  value={this.props.newClassQuarter}
                  onChange={value => this.newClassQuarterChangeHandler(value)}
                />
                <ClassImageUploader/>


              </FormFields>

              <Footer pad={{ vertical: "medium", horizontal: "medium" }}>
                <Button
                  label="Create Class"
                  type="button"
                  path="/liveclass"
                  primary={true}
                  onClick={() => this.addClassHandler()}
                />
                {/* onClick={...} /> this would be a function to save class to postgres */}
              </Footer>
            </Form>
          </Layer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    classes: state.teachersClassView.classes,
    showClassBuilderModal: state.teachersClassView.showClassBuilderModal,
    newClassName: state.teachersClassView.newClassName,
    newClassSubject: state.teachersClassView.newClassSubject,
    newClassQuarter: state.teachersClassView.newClassQuarter,
    newClassYear: state.teachersClassView.newClassYear,
		newClass: state.teachersClassView.newClass,
		subjects: state.teachersClassView.subjects,
    auth: state.auth
  };
}

function matchDispatchToProps(dispatch) {
  Actions.watchClassGoLive(dispatch);
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(TeacherMainView);
