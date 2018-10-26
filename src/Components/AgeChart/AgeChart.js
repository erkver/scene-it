import React, { Component } from "react";
import { Bar } from "react-chartjs-2";


class AgeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageData: props.ageData
    }
  }

  componentDidUpdate(prevProps) {
    const { ageData } = this.props;
    if (ageData.datasets[0] !== prevProps.ageData.datasets[0]) {
      this.setState({ ageData: this.props.ageData });
    }
  }

  render() {
    const { ageData } = this.state;
    // console.log(ageData);
    console.log(this.props);
    return (
      <div>
        <h2>Age</h2>
        <Bar
          data={ageData}
          options={{
            tooltips: {
              mode: 'label',
              callbacks: {
                label: function(tooltipItem, data) {
                  return data['datasets'][0]['data'][tooltipItem['index']] + '%'
                }
              }
            },
            scales: {
              yAxes: [{
                ticks: {
                  callback: function (value) {
                    return `${value}%`
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: "Percentage"
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "Age Ranges"
                }
              }]
            }
          }}
        />
      </div>
    )
  }
}


export default AgeChart;