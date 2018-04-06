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
import Image from 'grommet/components/Image';
import { Layers, Base, Value } from "grommet";
import Section from 'grommet/components/Section';
import Label from 'grommet/components/Label';
import Box from 'grommet/components/Box';
import AnnotatedMeter from './modifiedAnnotatedMeter.js';
import Legend from 'grommet/components/Legend';
//import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
//import Layers from "grommet/components/chart/Layers";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";

class ClassPerformance extends React.Component {
  // constructor() {
  //   super()
  //   this.state = {
  //     activeIndex: 0
  //   }
  // }
  render() {
    return (
      <Section pad='small' justify='center' align='center' >
      <div style={{width:'80%', align:'center'}}>
      <Box responsive={true}>
      <Chart full={true}>
        <Axis
          count={5}
          labels={[{ index: 2, label: "50" }, { index: 4, label: "100" }]}
          vertical={true}
          ticks={true}
        />
        <Chart vertical={true} full={true}>
          <Base height="medium" width="full" />
          <Layers>
            <Grid rows={1} columns={2} />
            {this.props.teachersClassView.selectedGraphs.map((eachGraph, index) => {
              return (
                <Line
                  key={index}
									colorIndex={eachGraph.color || 'graph-1'}
                  points={true}
                  values={eachGraph.sub.map(eachScore => {
                    return Object.values(eachScore)[0];
                  })}
                />
              );
              <Legend series={[{"label": "Honeydew", "colorIndex": "graph-1"}, {"label": "Orange", "colorIndex": "graph-2"}, {"label": "Blueberry", "colorIndex": "graph-3"}]}/>
            })}
            {/* <Marker colorIndex='graph-2'
                    count={this.props.teachersClassView.selectedGraphs[0].sub.length}
                    vertical={true}
                    index={1} />
            <HotSpots
              count={12}
              max={100}
              activeIndex={11}
              onActive={() => this.setState({
                activeIndex: (undefined === index ? (this.props.teachersClassView.selectedGraphs[0].sub.length - 1) : index)
              })}
            /> */}
          </Layers>
          
          <Axis
            ticks={true}
            count={this.props.teachersClassView.selectedGraphs[0].sub.length}
            labels={this.props.teachersClassView.selectedGraphs[0].sub.map(
              (eachQuiz, index) => {
                return { index: index, label: "Quiz " + Number(index + 1) };
              }
            )}
          	/>
          <Box responsive={true} align="end" direction="row" padding="small">
            {this.props.teachersClassView.selectedGraphs.slice(1).map((eachGraph, i) => {
              let average = Object.values(eachGraph.sub).reduce((sum, each) => {
                return sum += Object.values(each)[0]
              }, 0) / Object.values(eachGraph.sub).length
              let colorForName;
              if (average <= 65) {
                colorForName = '#ff7d28';
              } else if (average > 65 && average <=75) {
                colorForName = '#f4c242';
              } else {
                colorForName='#80cc6e';
              }  
              let data = Object.values(eachGraph.sub).map((eachScore, index) => {
                return {"label": "Quiz " + Number(index + 1) + ": ", "value": Math.round(Object.values(eachScore)[0])}
              }) 
              return (
                <Box key={i} onClick={() => this.props.reverseGraphSelection(i)} responsive={true}>
                <Label style={{color: colorForName}} size="medium">{eachGraph.value}</Label>
                <img 
                  src={eachGraph.thumbnail || "https://ca.slack-edge.com/T2SUXDE72-U8SAGQ1E0-8fa5cea28518-72"} 
                  style={{height: '50px', width: '50px', borderRadius: '50%', cursor:'pointer', opacity: 1 }}/>
                <Box pad="small">
                  <AnnotatedMeter legend={true}
                                  type='bar'
                                  max={150}
                                  units="%"
                                  series={data}/>
                </Box>
                </Box>
              );
            })}
          </Box>
        </Chart>
      </Chart>
      </Box>
      </div>
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

export default connect(mapStateToProps, matchDispatchToProps)(ClassPerformance);
