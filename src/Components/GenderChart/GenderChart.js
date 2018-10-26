import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";


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
    // console.log(genderData);
    // console.log(this.props);
    return (
      <div>
        <h2>Gender</h2>
        <Doughnut 
          data={genderData} 
          options={{
            tooltips: {
              callbacks: {
                label: function (tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem['index']] + '%'
                }
              }
            }
          }}
        />
      </div>
    )
  }
}

export default GenderChart;