import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import './GenderChart.scss';

class GenderChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: props.genderData
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.genderData.datasets[0] !== prevProps.genderData.datasets[0]
    ) {
      this.setState({ genderData: this.props.genderData });
    }
  }

  render() {
    const { genderData } = this.state;
    const { gender } = this.props;
    return (
      <div className="gen-cont">
        <h2>Gender</h2>
        <Doughnut
          data={genderData}
          options={{
            tooltips: {
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
        {gender[0] > gender[1] ? (
          <>
            <p className="male">males</p>
            <p>accounting for {`${gender[0]}%`} of users</p>
          </>
        ) : (
          <>
            <p className="female">females</p>
            <p>account for {`${gender[1]}%`} of users</p>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ adminReducer, screeningReducer, userReducer }) => ({
  ...adminReducer,
  ...screeningReducer,
  ...userReducer
});

export default connect(mapStateToProps)(GenderChart);
