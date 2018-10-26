import React, { Component } from "react";
import { Radar } from "react-chartjs-2";

class EthChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethData: props.ethData
    }
  }

  componentDidUpdate(prevProps) {
    const { ethData } = this.props;
    if (ethData.datasets[0] !== prevProps.ethData.datasets[0]) {
      this.setState({ethData: this.props.ethData });
    }
  }

  render() {
    const { ethData } = this.state;
    // console.log(ageData);
    console.log(this.props);
    return (
      <div>
        <h2>Ethnicity</h2>
        <Radar
          data={ethData}
          options={{
            tooltips: {
              mode: 'label',
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


export default EthChart;