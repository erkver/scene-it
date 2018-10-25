import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";


class GenderChart extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      genderData: props.genderData
    }
  }
  render() {
    const { genderData } = this.state;
    return (
      <div>
        <h2>Gender breakdown</h2>
        <Doughnut data={genderData} />
      </div>
    )
  }
}

export default GenderChart;