import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
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
        <h2>Interested attendees by gender</h2>
        <Doughnut 
          data={genderData} 
          options={{
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  let dataset = data.datasets[tooltipItem.datasetIndex];
                  let meta = dataset._meta[Object.keys(dataset._meta)[0]];
                  let total = meta.total;
                  let currentValue = dataset.data[tooltipItem.index];
                  let percentage = parseFloat((currentValue / total * 100).toFixed(1));
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
  userReducer,
}) => ({
  ...adminReducer,
  ...userReducer,
});

export default withRouter(connect(mapStateToProps)(GenderChart));