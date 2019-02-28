import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import './EthChart.scss';

class EthChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ethData: props.ethData
    };
  }

  componentDidUpdate(prevProps) {
    const { ethData } = this.props;
    if (ethData.datasets[0] !== prevProps.ethData.datasets[0]) {
      this.setState({ ethData: this.props.ethData });
    }
  }

  renderContent = () => {
    const { labels } = this.state.ethData;
    const { data, borderColor } = this.state.ethData.datasets[0];
    let max = Math.max(...data);
    let ethInd = data.indexOf(max);
    return (
      <>
        <h3 style={{ color: `${borderColor}` }}>{`${labels[ethInd]}`}</h3>
        <p>is {`${data[ethInd]}%`} of user's ethnicity</p>
      </>
    );
  };

  render() {
    const { ethData } = this.state;
    return (
      <div className="eth-cont">
        <h2>Ethnicity</h2>
        <Radar
          data={ethData}
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
            }
          }}
        />
        {!(ethData.datasets && ethData.datasets[0]) ? (
          <div>Loading...</div>
        ) : (
          this.renderContent()
        )}
      </div>
    );
  }
}

export default EthChart;
