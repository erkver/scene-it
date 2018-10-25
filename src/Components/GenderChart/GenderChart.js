import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { getAllUsers } from "../../Ducks/adminReducer";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class GenderChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: props.genderData
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.genderData.datasets[0] !== prevProps.genderData.datasets[0]) {
      this.setState({ genderData: this.props.genderData });
    }
  }

  render() {
    const { genderData } = this.state;
    console.log(genderData);
    console.log(this.props);
    return (
      <div>
        <h2>Gender breakdown</h2>
        <Doughnut 
          data={genderData} 
          options={{
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  var dataset = data.datasets[tooltipItem.datasetIndex];
                  var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                  var total = meta.total;
                  var currentValue = dataset.data[tooltipItem.index];
                  var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                  return `${percentage}%`;
                },
                title: function (tooltipItem, data) {
                  return data.labels[tooltipItem[0].index];
                }
              }
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  adminReducer,
  screeningReducer,
  userReducer,
  favoritesReducer
}) => ({
  ...adminReducer,
  ...screeningReducer,
  ...userReducer,
  ...favoritesReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAllUsers }
  )(GenderChart)
);