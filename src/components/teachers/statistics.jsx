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
import Headline from "grommet/components/Headline";
import Label from "grommet/components/Label";
import Notification from "grommet/components/Notification";
import BarChartIcon from 'grommet/components/icons/base/BarChart';
import Select from "grommet/components/Select";
import Header from "grommet/components/Header";
import Anchor from "grommet/components/Anchor";
import Section from "grommet/components/Section";
import config from "../../../server/config.js";
import Button from "grommet/components/Button";
import Status from 'grommet/components/icons/Status';
import ListItem from 'grommet/components/ListItem';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';
import List from 'grommet/components/List';
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
      <Section margin="none"
      pad="none">
        <Header
					direction="row"
					// full="true"
					justify="between"
					alignContent="center"
					margin="small"
					responsive={false}
					pad="small"
					colorIndex="light-2"
					fixed={false}
					style={{margin: '0', top: '112px', zIndex:'2'}}>
            <Box
              style={{width: '400'}}
              direction="row"
              margin="none">
              <Anchor icon={<LinkPreviousIcon size="medium" href="/liveclass"/>}
							// label= {'Back To Class'}
							style={{lineHeight: '100px', marginLeft: "10px", width: '100px'}}
							primary={false}
							secondary={false}
							accent={true}
							critical={false}
							plain={false} 
						/>
            </Box>
            <Box direction="column"
						     margin="none"
						     style={{margin: '0 50px 0 50px'}}
						     justify="center"
						     flex="grow">
              <Headline style={{marginBottom: 0, lineHeight: '75px', textAlign:'center'}}>
                <Anchor icon={<BarChartIcon size="large" colorIndex='accent-2' />}
                  label= {'Stats'}
                  style={{lineHeight: '100px', marginLeft: "20px", width: '130px'}}
                  primary={false}
                  secondary={false}
                  accent={true}
                  critical={false}
                  plain={false}/> 
						  </Headline>
            </Box>
            <Box style={{width: '300px'}}
						     direction="row"
						     justify="end"
						     margin="none">
              {/* {this.props.teachersClassView.targetClass.name} */}
              <Select
                placeHolder="None"
                multiple={true}
                inline={false}
                // onSearch={...}
                options={this.props.teachersClassView.studentsAndPerformances
                        ? Object.values(this.props.teachersClassView.studentsAndPerformances)
                          .map((eachStudent, index) => { return eachStudent;})
                        : ""
                }
                value={this.props.selectedGraphs}
                onChange={target => {
                  this.props.selectGraphToShow(target);
                }}/>      
            </Box>
        </Header>
          
        {/* </Section> */}
        <Box responsive={true}>
        {this.props.teachersClassView.takenQuizzesAverages ? (
          <ClassPerformance />
        ) : (
          <div />
        )}
        </Box>
        <Section pad='small' justify='center' align='center' responsive={true}>
          <div style={{width:'60%', align:'center'}}>
            <Box>
              <Accordion
              // onActive={(index)=> this.selectQuiz(this.props.teachersClassView.quizzes[Object.keys(this.props.teachersClassView.quizzes)[index]])}
              >
                {Object.values(this.props.teachersClassView.takenQuizzes).map(
                  (quiz, i) => {
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
                    var interval = [];
                    for (var j = 0; j <= Math.ceil(highest / 5); j++) {
                      var obj = {};
                      obj.index = j;
                      obj.label = j * 5;
                      interval.push(obj);
                    }

                    var histogramHighest = 0;
                    for (var k = 0; k < Object.values(quiz.studentScoreHistogram).length; k++) {
                      if (Object.values(quiz.studentScoreHistogram)[k] > histogramHighest) {
                        histogramHighest = Object.values(quiz.studentScoreHistogram)[k];
                      }
                    }

                    var histogramInterval = [];
                    for (var l = 0; l <= Math.ceil(histogramHighest / 2); l++) {
                      var obj = {};
                      obj.index = l;
                      obj.label = l * 2;
                      histogramInterval.push(obj);
                    }
                    //console.log('hisogram highest', histogramHighest)
                    let quizAverageColorIndex;
                    let graphColorIndex;
                    if (quiz.average <= 65) {
                      quizAverageColorIndex = 'accent-1';
                      graphColorIndex = 'graph-3'
                    } else if (quiz.average > 65 && quiz.average <=75) {
                      quizAverageColorIndex = 'accent-2';
                      graphColorIndex = 'graph-1'
                    } else {
                      quizAverageColorIndex='neutral-1';
                      graphColorIndex = 'graph-2'
                    }
                    let quizAverageComponent = <Value value={quiz.average} colorIndex={quizAverageColorIndex} units='%'/>
                    console.log('Object.values(quiz.studentScoreHistogram', Object.values(quiz.studentScoreHistogram))
                    console.log("Object.values(quiz.quizDiscrete)", Object.values(quiz.quizDiscrete))
                    return (
                      <AccordionPanel heading={
                        <Box direction='row' full='horizontal' margin='small' alignContent='stretch' justify='between'>
                          <Box direction='column' justify='start' alignContent='between' style={{width: '400px', maxWidth: '720px'}} style={{marginRight: 'auto'}}>
                            <Heading tag='h3'>
                              {quiz.name}
                            </Heading>
                          </Box>
                          <Box direction='column' justify='center' style={{width: '298px'}} style={{margin: '0 50px 0 50px'}}>
                            <Heading tag='h3'>
                              Weight:  {quiz.weight}%
                            </Heading>
                          </Box>
                          <Box direction='column' justify='end' alignContent='center' style={{width: '298px'}} style={{marginRight: '30px'}}>
                            <Heading tag='h3'>
                              Average: {quizAverageComponent}
                            </Heading>
                          </Box>
                        </Box>
                      }>
                          <Button label="Show Distribution" onClick={() => this.props.showDistribution()}></Button>
                          {this.props.teachersClassView.showDistribution ? 
                          <Section pad='none' justify='center' align='center'> 
                            <Chart vertical={false}>
                            <Axis
                              vertical={true}
                              count={histogramInterval.length}
                              labels={histogramInterval}
                            />
                              <Chart>
                                <Base width="large"/>
                                  <Layers>
                                  <Grid rows={5} columns={3}/>
                                    <Bar
                                      style={{strokeWidth: "92px"}}
                                      colorIndex = {graphColorIndex}
                                      // vertical={true}
                                      // reverse={true}
                                      max={histogramHighest + 2}
                                      values={Object.values(quiz.studentScoreHistogram).map(
                                        each => each
                                      )}  
                                    />
                                  
                                  <Axis count={Object.keys(quiz.studentScoreHistogram).length}
                                    vertical={false}
                                    tickAlign = "start"
                                    labels={Object.keys(quiz.studentScoreHistogram).map(
                                      (range, index) => {
                                        return {
                                          index: index,
                                          label: range
                                        };
                                      }
                                    )}/>
                                  </Layers> 
                            
                                </Chart> 
                              {/* </Base> */}
                            </Chart>
                          </Section> 
                        : <Section>
                          <Chart vertical={true}>
                            <Axis
                              // vertical={true}
                              count={interval.length}
                              labels={interval}
                            />
                            <Chart >
                            <Axis
                                vertical={true}
                                reverse={true}
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
                              <Base width="large" />
                              <Layers>
                                <Grid rows={5} columns={3}/>
                                <Bar
                                  style={{strokeWidth: "25px"}}
                                  colorIndex = {graphColorIndex}
                                  vertical={true}
                                  reverse={true}
                                  max={highest + 2}
                                  values={Object.values(quiz.quizDiscrete).map(
                                    each => each
                                  )}
                                />
                              </Layers>
                            </Chart>  
                          </Chart> 
                        </Section>}
                        <Section pad='small' justify='center' align='center'>
                          {Object.values(quiz.questions).map((question, i) => {
                            return (
                              <Box direction='row'
                                  full='horizontal'
                                  alignContent='between'
                                  style={{marginBottom:'50px'}}>
                                <Box key={i}
                                    direction='column'
                                    full='horizontal'
                                    alignContent='between'
                                    style={{marginBottom:'50px'}}>
                                  <Heading tag="h3">
                                    {question.text}
                                  </Heading>
                                  <List>
                                    {Object.values(question.answers).map((answer, i) => {
                                      let isCorrect = answer.isCorrect;
                                      var marker;
                                      if (answer.isCorrect === true) {
                                        marker = <Status value='ok' style={{marginRight:'10px'}} />
                                      } else if (answer.isCorrect === false) {
                                        marker = <Status value='critical' style={{marginRight:'10px'}} />
                                      }

                                      return (
                                        <ListItem key={i} separator='horizontal'>
                                          {marker}    {i+1}) {answer.text}
                                        </ListItem>
                                      );
                                    })}
                                  </List>
                                </Box>
                              </Box>
                            );
                          })}
                        </Section>
                      </AccordionPanel>
                    );
                  }
                )}
              </Accordion>
            </Box>
          </div>
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
