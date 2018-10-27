import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import './GenreChart.scss'

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


  renderContent = () => {
    const { labels } = this.state.genreData;
    const { data, backgroundColor } = this.state.genreData.datasets[0];
    let max = Math.max(...data);
    let genreInd = data.indexOf(max);
    console.log(max, genreInd);
    return (
      <>
        <h3 style={{color: `${backgroundColor[genreInd]}`}}>{`${labels[genreInd]}`}</h3>
        <p>is {`${data[genreInd]}%`} of user's favorite genre</p>
      </>
    );
  }

  render() {
    const { genreData } = this.state;
    // console.log(ageData);
    console.log(this.props);
    return (
      <div className="genre-cont">
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
        {!(genreData.datasets && genreData.datasets[0]) ?
          <div>Loading...</div>
          :
          this.renderContent()
        }
      </div>
    )
  }
}


export default GenreChart;