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
// import Value from "grommet/components/Value";
// import Base from "grommet/components/Value";
// import Layer from "grommet/components/Layer";
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
      <Chart>
        <Axis
          count={5}
          labels={[{ index: 2, label: "50" }, { index: 4, label: "100" }]}
          vertical={true}
        />
        <Chart vertical={true}>
          <MarkerLabel count={12} index={11} label={<Value value={50} />} />
          <Base height="medium" width="medium" />
          <Layers>
            <Grid rows={5} columns={3} />
            {/* <Area
              values={[50, 45, 30, 35, 0, 5, 10, 15, 75, 80, 90, 100]}
              colorIndex="graph-1"
              activeIndex={11}
            />
            <Bar
              values={[45, 25, 60, 12, 35, , 10, 45, 60, 85, 70, 20]}
              colorIndex="graph-2"
              activeIndex={11}
						/> */}
						{
							this.props.teachersClassView.selectedGraphs.map((eachGraph) => {
								return (<Line 
													values={eachGraph.sub.map((eachScore) => {
														return Object.values(eachScore)[0]
													})}
											 />)
							})
						}
            {/* <Line
              values={Object.values(this.props.teachersClassView.takenQuizzesAverages)}
              colorIndex="accent-1"
              activeIndex={11}
            />
						 <Line
              values={[45, 25, 60, 12, 35, , 10, 45, 60, 85, 70, 20]}
              colorIndex="accent-1"
              activeIndex={11}
            /> */}
            {/* <Marker
              colorIndex="graph-2"
              count={12}
              vertical={true}
              index={11}
            />
            <HotSpots
              count={12}
              max={100}
              activeIndex={11}
              onActive={() => {}}
            /> */}
          </Layers>
          <Axis
            count={2}
            labels={[{ index: 0, label: "2012" }, { index: 1, label: "2015" }]}
          />
        </Chart>
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
