import React from "react";
import * as actions from "../../actions/index.js";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";
import Box from "grommet/components/Box";
import Split from "grommet/components/Split";
import Heading from "grommet/components/Heading";
import Label from "grommet/components/Label";
import Notification from "grommet/components/Notification";
import Select from "grommet/components/Select";
import Section from "grommet/components/Section";
import config from "../../../server/config.js";
import Chart, {
  Axis,
  Grid,
  Area,
  Bar,
  Line,
  Marker,
  MarkerLabel,
  HotSpots
} from "grommet/components/chart/Chart";
import Meter from "grommet/components/Meter";

import { Layers, Base, Value } from "grommet";
//const config = require('../server/config.js');
//require('plotly')("AraNguyen", config.plotly)
import ClassPerformance from "./classPerformace.jsx";

class Statistics extends React.Component {
  render() {
    return (
      <Section>
        <Section>
          <Select
            placeHolder="None"
            multiple={true}
            inline={false}
            // onSearch={...}
            options={
              this.props.teachersClassView.studentsAndPerformances
                ? Object.values(
                    this.props.teachersClassView.studentsAndPerformances
                  ).map((eachStudent, index) => {
                    return eachStudent;
                  })
                : ""
            }
            value={this.props.selectedGraphs}
            onChange={target => {
              this.props.selectGraphToShow(target);
            }}
          />
        </Section>
        {this.props.teachersClassView.takenQuizzesAverages ? (
          <ClassPerformance />
        ) : (
          <div />
        )}
        <Section>
          <Box>
            <Accordion
            // onActive={(index)=> this.selectQuiz(this.props.teachersClassView.quizzes[Object.keys(this.props.teachersClassView.quizzes)[index]])}
            >
              {Object.values(this.props.teachersClassView.takenQuizzes).map(
                quiz => {
                  var highest = 0;
                  for (
                    var i = 0;
                    i < Object.values(quiz.quizDiscrete).length;
                    i++
                  ) {
                    if (Object.values(quiz.quizDiscrete)[i] > highest) {
                      highest = Object.values(quiz.quizDiscrete)[i];
                    }
                  }
                  console.log("highest", highest);
                  var interval = [];
                  for (var j = 0; j <= Math.ceil(highest / 5); j++) {
                    var obj = {};
                    obj.index = j;
                    obj.label = j * 5;
                    interval.push(obj);
                  }
                  console.log("interval", interval);
                  return (
                    <AccordionPanel heading={<Label>{quiz.name}</Label>}>
                      <Label>{"Average: " + quiz.average}</Label>
                      <Chart>
											<Axis
                          vertical={true}
                          //count={}
                          count={interval.length}
                          labels={interval}
                          //labels={[{"index": 2, "label": "20"}, {"index": 4, "label": "40"}]}
                        />
                        <Chart >
												
												
                          {/* <Axis vertical={true} count={1} ticks={true} /> */}
                          <Base width="large"/>
                          <Layers>
														<Grid rows={5} columns={3}/>
                            <Bar
															max={highest + 2}
                              values={Object.values(quiz.quizDiscrete).map(
                                each => each
                              )}
                            />
													<Axis
														vertical={false}
														ticks={true}
                            count={Object.keys(quiz.quizDiscrete).length}
                            labels={Object.keys(quiz.quizDiscrete).map(
                              (grade, index) => {
                                return {
                                  index: index,
                                  label: grade
                                };
                              }
                            )}
                          />
                          </Layers>
                        </Chart>
												
                      </Chart>
                      {Object.values(quiz.questions).map((question, i) => {
                        return (
                          <Box key={i}>
                            <Heading tag="h3">{question.text}</Heading>
                            {Object.values(question.answers).map(answer => {
                              return (
                                <Notification
                                  message={answer.text}
                                  size="small"
                                  status={answer.isCorrect ? "ok" : "critical"}
                                />
                              );
                            })}
                          </Box>
                        );
                      })}
                    </AccordionPanel>
                  );
                }
              )}
            </Accordion>
          </Box>
        </Section>
      </Section>
    );
  }
}

function mapStateToProps(state) {
  return {
    teachersClassView: state.teachersClassView
  };
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);
