import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class GenreChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genreData: props.genreData
    }
  }

  componentDidUpdate(prevProps) {
    const { genreData } = this.props;
    if (genreData.datasets[0] !== prevProps.genreData.datasets[0]) {
      this.setState({ genreData: this.props.genreData });
    }
  }

  render() {
    const { genreData } = this.state;
    // console.log(ageData);
    console.log(this.props);
    return (
      <div>
        <h2>Favorite genre</h2>
        <Pie
          data={genreData}
          options={{
            tooltips: {
              mode: 'label',
              callbacks: {
                label: function (tooltipItem, data) {
                  return `${data['datasets'][0]['data'][tooltipItem['index']]}%`
                }
              }
            }
          }}
        />
      </div>
    )
  }
}


export default GenreChart;