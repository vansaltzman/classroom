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
//import Layers from "grommet/components/chart/Layers";
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../../actions/index.js";

class ClassPerformance extends React.Component {
  render() {
    console.log(
      "hiii",
      Object.values(this.props.teachersClassView.takenQuizzesAverages)
    );
    return (
      <Chart full={true}>
        <Axis
          count={5}
          labels={[{ index: 2, label: "50" }, { index: 4, label: "100" }]}
          vertical={true}
        />
        <Chart vertical={true} full={true}>
          <Base height="medium" width="medium" />
          <Layers>
            <Grid rows={5} columns={3} />
            {this.props.teachersClassView.selectedGraphs.map(eachGraph => {
              return (
                <Line
                  points={true}
                  values={eachGraph.sub.map(eachScore => {
                    return Object.values(eachScore)[0];
                  })}
                />
              );
            })}
            <HotSpots
              count={12}
              max={100}
              activeIndex={11}
              onActive={() => {}}
            />
          </Layers>
          <Axis
            count={2}
            labels={this.props.teachersClassView.selectedGraphs[0].sub.map(
              (eachQuiz, index) => {
                return { index: index, label: "Quiz " + Number(index + 1) };
              }
            )}
          />
        </Chart>
        {/* <Chart a11yTitle="Chart representing number of commits in the last three days.">
          <Axis vertical={true} count={3} ticks={true} />
          <Base />
          <Layers>
            <Bar values={[70, 10, 20, 100, 60]} />
          </Layers>
        </Chart> */}
      </Chart>
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
