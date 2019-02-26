import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import './AgeChart.scss';

class AgeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ageData: props.ageData
    };
  }

  componentDidUpdate(prevProps) {
    const { ageData } = this.props;
    if (ageData.datasets[0] !== prevProps.ageData.datasets[0]) {
      this.setState({ ageData: this.props.ageData });
    }
  }

  renderContent = () => {
    const { data, borderColor } = this.state.ageData.datasets[0];
    const { labels } = this.state.ageData;
    let max = Math.max(...data);
    let ageInd = data.indexOf(max);
    return (
      <>
        <h3 style={{ color: `${borderColor}` }}>{`${labels[ageInd]}`}</h3>
        <p>year-olds account for {`${data[ageInd]}%`}</p>
      </>
    );
  };

  render() {
    const { ageData } = this.state;
    return (
      <div className="age-cont">
        <h2>Age</h2>
        <Bar
          data={ageData}
          options={{
            tooltips: {
              mode: 'label',
              callbacks: {
                label: function(tooltipItem, data) {
                  return (
                    data['datasets'][0]['data'][tooltipItem['index']] + '%'
                  );
                }
              }
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function(value) {
                      return `${value}%`;
                    }
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Percentage'
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Age Ranges'
                  }
                }
              ]
            }
          }}
        />
        {!(ageData.datasets && ageData.datasets[0]) ? (
          <div>Loading...</div>
        ) : (
          this.renderContent()
        )}
      </div>
    );
  }
}

export default AgeChart;
