import React from "react";
import * as actions from "../../actions/index.js";

import "grommet/scss/hpinc/index.scss";
import Columns from "grommet/components/Columns";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Section from "grommet/components/Section";
import DeployIcon from "grommet/components/icons/base/Deploy";
import SearchInput from "grommet/components/SearchInput";
import Layer from "grommet/components/Layer";
import Header from "grommet/components/Header";
import Form from "grommet/components/Form";
import Heading from "grommet/components/Heading";
import Footer from "grommet/components/Footer";
import FormFields from "grommet/components/FormFields";
import TextInput from "grommet/components/TextInput";
import AddCircleIcon from "grommet/components/icons/base/AddCircle";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";
import Label from "grommet/components/Label";
import CheckBox from "grommet/components/CheckBox"

import classRoom from "../../../data/quizDummyData.js";
import launchQuiz from "../../../db/liveClassroom.js";

class ClassView extends React.Component {
  constructor() {
    super();
    this.launchNewQuiz = this.launchNewQuiz.bind(this);
  }
  launchNewQuiz() {
    console.log("CLICK HEARD");
    console.log("CLASSROOM", classRoom);
    console.log("LAUNCH QUIZ", launchQuiz);
    launchQuiz.launchQuiz("1", classRoom.classRoom["25"].quizzes["12"]);
  }
  componentWillMount() {
    this.props.getAllStudents();
    this.props.getStudentsBelongToAClass({ id: this.props.classId });
  }

  componentWillUpdate() {
    //this.props.getStudentsBelongToAClass({ id: this.props.classId });
  }

  render() {
    const { studentsInClass } = this.props;
    //console.log('heyyy', studentsInClass)
    const studentsArray = [];
    for (var key in this.props.teachersClassView.targetClass.students) {
      studentsArray.push(
        this.props.teachersClassView.targetClass.students[key]
      );
    }
    return (
      <Section>
        <Button
          icon={<DeployIcon />}
          label="Go Live"
          primary={false}
          secondary={false}
          accent={true}
          critical={false}
          plain={false}
          onClick={() =>
            this.props.classGoLive(this.props.classId, this.props.targetClass)
          }
        />

        <Button
          icon={<DeployIcon />}
          label="Launch Quiz"
          primary={false}
          secondary={false}
          accent={true}
          critical={false}
          plain={false}
          onClick={() => this.launchNewQuiz()}
        />

        <Columns masonry={false} maxCount={2} size="large" align="center">
          <Box align="center" pad="medium" margin="small" colorIndex="light-2">
            Side bar for students list
            {studentsArray.map((each, index) => {
              return (
                <Box
                  key={index}
                  style={{ color: each.isHere ? "black" : "lightgrey" }}
                >
                  {each.name}
                </Box>
              );
            })}
            <SearchInput
              placeHolder="Search For A Student"
              suggestions={this.props.studentNames}
              //  onDOMChange={(target) => this.props.selectStudentToAdd(target)} />
              onSelect={target => this.props.selectStudentToAdd(target)}
            />
            <Button
              label="Add Student"
              onClick={() => {
                this.props.addAStudentToClass({
                  classId: this.props.classId,
                  studentId: this.props.teachersClassView.selectedStudent.sub.id
                });
              }}
            />
          </Box>

          <Box align="center" pad="medium" margin="small" colorIndex="light-2">
						Quiz List
						<Button 
							label="Create New Quiz"
							onClick={this.props.showQuizModal}/>
          </Box>
        </Columns>
				{this.props.teachersClassView.showQuizBuilderModal ?
					<Layer closer={true}
								 flush={true} 
								 overlayClose={true}>
						<Form>
              <Header pad={{ vertical: "medium", horizontal: "medium" }}>
                <Heading>
                  Create A New Quiz
                </Heading>
              </Header>
                <Section pad={{ vertical: "medium", horizontal: "medium" }}>
                  <FormFields>
                    <TextInput 
                      placeHolder="Please Name Your Quiz"
                      onDOMChange={value => {
                        this.props.setNewQuizName(value);
                      }}/>
                    <SearchInput 
                      placeHolder="Quiz Subject"
                      suggestions={this.props.subjects}
                      // value={this.props.targetClass.newQuizs.subject.value ? this.props.targetClass.newQuiz.subject.value : this.props.targetClass.newQuiz.value ? this.props.targetClass.newQuiz.value : undefined}
                      onDOMChange={(event) => this.props.setNewQuizSubject(event)}
                      onSelect={(target) => this.props.setNewQuizSubjectBySelection(target)}/>
                      {this.props.teachersClassView.newQuiz.questions.map((each, index) => {
                          return (
                            <Section>
                              <Label>{'Question' + ' ' + index+1}</Label>
                              <TextInput placeHolder="Question..."
                                         onDOMChange={(event) => {this.props.addQuestionText(event, index)}}/>
                              {each.answers.map((eachAnswer, answerIndex) => {
                                return (
                                  <Section>
                                    <TextInput placeHolder="Answer..."
                                               onDOMChange={(event) => this.props.addAnswerText(event, index, answerIndex)}/>
                                    <CheckBox label='Correct'
                                              toggle={false}
                                              reverse={true} />
                                  </Section>
                                )
                              })}
                              <Button icon={<AddCircleIcon />} 
                                      label="Add Answer"
                                      onClick={() => {this.props.addAnswer(index)}}/>
                            </Section>
                          )
                        }) }
                      <Button icon={<AddCircleIcon />}
                                      onClick={() => this.props.setQuestionNumber()}
                                      label="Add Question"/>
                  </FormFields>
                </Section>
              <Footer pad={{"vertical": "medium", horizontal: "medium"}}>
                <Button label='Submit'/>
              </Footer>
						</Form>
					</Layer>
				: <div></div>}
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    targetClass: state.teachersClassView.targetClass,
    studentsInClass: state.teachersClassView.targetClass.students,
    students: state.teachersClassView.students,
    studentNames: state.teachersClassView.studentNames,
    classId: state.teachersClassView.targetClass.id,
    selectedStudent: state.teachersClassView.selectStudent,
    subjects: state.teachersClassView.subjects,
    teachersClassView: state.teachersClassView
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ClassView);
