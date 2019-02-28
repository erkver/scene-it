import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScreening } from '../../Ducks/screeningReducer';
import { Link } from 'react-router-dom';
import { getTheatres } from '../../Ducks/theatreReducer';
import {
  getUsersByGen,
  getUsersByAge,
  getUsersByEth,
  getUsersByGenre,
  getUsersByParams,
  clearAllData
} from '../../Ducks/adminReducer';
import GenderChart from '../../Components/GenderChart/GenderChart';
import AgeChart from '../../Components/AgeChart/AgeChart';
import EthChart from '../../Components/EthChart/EthChart';
import GenreChart from '../../Components/GenreChart/GenreChart';
import './ScreeningData.scss';

class ScreeningData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: {},
      ageData: {},
      ethData: {},
      genreData: {},
      ageSelect: 'all',
      ethSelect: 'all',
      genreSelect: 'all'
    };
  }

  componentWillMount() {
    const {
      getScreening,
      getUsersByGen,
      getUsersByAge,
      getUsersByEth,
      getUsersByGenre
    } = this.props;
    const { id } = this.props.match.params;
    getScreening(id);
    getUsersByGen(id).then(() => this.getGenderData());
    getUsersByAge(id).then(() => this.getAgeData());
    getUsersByEth(id).then(() => this.getEthData());
    getUsersByGenre(id).then(() => this.getGenreData());
  }

  getGenderData = () => {
    const { gender } = this.props;
    this.setState({
      genderData: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: gender,
            backgroundColor: ['#347dc1', '#cc6594'],
            borderColor: '#4C3B4D',
            hoverBackgroundColor: ['#2768a4', '#b85887']
          }
        ]
      }
    });
  };

  getAgeData = () => {
    const { age } = this.props;
    const { ageSelect } = this.state;
    if (ageSelect === 'female') {
      this.setState({
        ageData: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          datasets: [
            {
              label: 'Females',
              data: age[2],
              backgroundColor: 'rgba(204,101,148,0.2)',
              borderColor: 'rgba(204,101,148,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(184,88,135,0.4)',
              hoverBorderColor: 'rgba(184,88,135,1)'
            }
          ]
        }
      });
    } else if (ageSelect === 'male') {
      this.setState({
        ageData: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          datasets: [
            {
              label: 'Males',
              data: age[1],
              backgroundColor: 'rgba(52,125,193,0.2)',
              borderColor: 'rgba(52,125,193,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(39,104,164,0.4)',
              hoverBorderColor: 'rgba(39,104,164,1)'
            }
          ]
        }
      });
    } else {
      this.setState({
        ageData: {
          labels: ['18-24', '25-34', '35-44', '45-54', '55+'],
          datasets: [
            {
              label: 'All',
              data: age[0],
              backgroundColor: 'rgba(106,112,110,0.2)',
              borderColor: 'rgba(106,112,110,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(76,59,77,0.4)',
              hoverBorderColor: 'rgba(76,59,77,1)'
            }
          ]
        }
      });
    }
  };

  getEthData = () => {
    const { eth } = this.props;
    const { ethSelect } = this.state;
    if (ethSelect === 'female') {
      this.setState({
        ethData: {
          labels: [
            'Asian',
            'Hispanic',
            'African-American',
            'Caucasian',
            'Native American',
            'Middle Eastern'
          ],
          datasets: [
            {
              label: 'Females',
              data: eth[2],
              backgroundColor: 'rgba(204,101,148,0.2)',
              borderColor: 'rgba(204,101,148,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(184,88,135,0.4)',
              hoverBorderColor: 'rgba(184,88,135,1)'
            }
          ]
        }
      });
    } else if (ethSelect === 'male') {
      this.setState({
        ethData: {
          labels: [
            'Asian',
            'Hispanic',
            'African-American',
            'Caucasian',
            'Native American',
            'Middle Eastern'
          ],
          datasets: [
            {
              label: 'Males',
              data: eth[1],
              backgroundColor: 'rgba(52,125,193,0.2)',
              borderColor: 'rgba(52,125,193,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(39,104,164,0.4)',
              hoverBorderColor: 'rgba(39,104,164,1)'
            }
          ]
        }
      });
    } else if (ethSelect === 'all') {
      this.setState({
        ethData: {
          labels: [
            'Asian',
            'Hispanic',
            'African-American',
            'Caucasian',
            'Native American',
            'Middle Eastern'
          ],
          datasets: [
            {
              label: 'All',
              data: eth[0],
              backgroundColor: 'rgba(106,112,110,0.2)',
              borderColor: 'rgba(106,112,110,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(76,59,77,0.4)',
              hoverBorderColor: 'rgba(76,59,77,1)'
            }
          ]
        }
      });
    } else {
      this.setState({
        ethData: {
          labels: [
            'Asian',
            'Hispanic',
            'African-American',
            'Caucasian',
            'Native American',
            'Middle Eastern'
          ],
          datasets: [
            {
              label: 'All',
              data: eth[0],
              backgroundColor: 'rgba(106,112,110,0.2)',
              borderColor: 'rgba(106,112,110,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(76,59,77,0.4)',
              hoverBorderColor: 'rgba(76,59,77,1)'
            },
            {
              label: 'Males',
              data: eth[1],
              backgroundColor: 'rgba(52,125,193,0.2)',
              borderColor: 'rgba(52,125,193,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(39,104,164,0.4)',
              hoverBorderColor: 'rgba(39,104,164,1)'
            },
            {
              label: 'Females',
              data: eth[2],
              backgroundColor: 'rgba(204,101,148,0.2)',
              borderColor: 'rgba(204,101,148,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(184,88,135,0.4)',
              hoverBorderColor: 'rgba(184,88,135,1)'
            }
          ]
        }
      });
    }
  };

  getGenreData = () => {
    const { genre } = this.props;
    const { genreSelect } = this.state;
    if (genreSelect === 'female') {
      this.setState({
        genreData: {
          labels: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance'],
          datasets: [
            {
              label: 'Females',
              data: genre[2],
              backgroundColor: [
                '#003f5c',
                '#58508d',
                '#bc5090',
                '#ff6361',
                '#ffa600'
              ],
              borderColor: '#002f45',
              borderWidth: 1,
              hoverBackgroundColor: [
                '#003650',
                '#524983',
                '#b54b8a',
                '#fb615f',
                '#ffa600'
              ],
              hoverBorderColor: '#002739'
            }
          ]
        }
      });
    } else if (genreSelect === 'male') {
      this.setState({
        genreData: {
          labels: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance'],
          datasets: [
            {
              label: 'Males',
              data: genre[1],
              backgroundColor: [
                '#003f5c',
                '#58508d',
                '#bc5090',
                '#ff6361',
                '#ffa600'
              ],
              borderColor: '#002f45',
              borderWidth: 1,
              hoverBackgroundColor: [
                '#003650',
                '#524983',
                '#b54b8a',
                '#fb615f',
                '#ffa600'
              ],
              hoverBorderColor: '#002739'
            }
          ]
        }
      });
    } else {
      this.setState({
        genreData: {
          labels: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance'],
          datasets: [
            {
              label: 'All',
              data: genre[0],
              backgroundColor: [
                '#003f5c',
                '#58508d',
                '#bc5090',
                '#ff6361',
                '#ffa600'
              ],
              borderColor: '#002f45',
              borderWidth: 1,
              hoverBackgroundColor: [
                '#003650',
                '#524983',
                '#b54b8a',
                '#fb615f',
                '#ffa600'
              ],
              hoverBorderColor: '#002739'
            }
          ]
        }
      });
    }
  };

  handleClick = () => {
    const { genderData, ethData, genreData } = this.state;
    const { screening, getUsersByParams } = this.props;
    //Gender data for get request
    let selGender = '';
    genderData.datasets[0].data[0] > genderData.datasets[0].data[1]
      ? (selGender = genderData.labels[0])
      : (selGender = genderData.labels[1]);
    //Age data
    const { data } = this.state.ageData.datasets[0];
    const { labels } = this.state.ageData;
    let max = Math.max(...data);
    let ageInd = data.indexOf(max);
    let minAge = 18;
    let maxAge = 75;
    if (labels[ageInd] === '55+') {
      minAge = 55;
    } else {
      minAge = +labels[ageInd].slice(0, 2);
      maxAge = +labels[ageInd].slice(3);
    }
    //Genre data
    let genreMax = Math.max(...genreData.datasets[0].data);
    let genreInd = genreData.datasets[0].data.indexOf(genreMax);
    let selGenre = genreData.labels[genreInd];
    //Ethnicity Data
    let ethMax = Math.max(...ethData.datasets[0].data);
    let ethInd = ethData.datasets[0].data.indexOf(ethMax);
    let selEth = ethData.labels[ethInd];
    getUsersByParams(
      screening[0].id,
      selGender,
      selEth,
      minAge,
      maxAge,
      selGenre
    );
  };

  componentWillUnmount() {
    this.props.clearAllData();
  }

  render() {
    const { screening } = this.props;
    const { genderData, ageData, ethData, genreData } = this.state;
    return (
      <div className="main-single-data-cont">
        <h1>{screening[0] && screening[0].title} Screening Data</h1>
        <div className="single-data-cont">
          <h2>Users in interested in attending by:</h2>
          <GenderChart genderData={genderData} />
          <AgeChart ageData={ageData} />
          <div className="age-btn-cont">
            <button
              onClick={() => {
                this.setState({ ageSelect: 'all' }, () => this.getAgeData());
              }}
            >
              All users
            </button>
            <button
              onClick={() => {
                this.setState({ ageSelect: 'male' }, () => this.getAgeData());
              }}
            >
              Males
            </button>
            <button
              onClick={() => {
                this.setState({ ageSelect: 'female' }, () => this.getAgeData());
              }}
            >
              Females
            </button>
          </div>
          <GenreChart genreData={genreData} />
          <div className="age-btn-cont">
            <button
              onClick={() => {
                this.setState({ genreSelect: 'all' }, () =>
                  this.getGenreData()
                );
              }}
            >
              All users
            </button>
            <button
              onClick={() => {
                this.setState({ genreSelect: 'male' }, () =>
                  this.getGenreData()
                );
              }}
            >
              Males
            </button>
            <button
              onClick={() => {
                this.setState({ genreSelect: 'female' }, () =>
                  this.getGenreData()
                );
              }}
            >
              Females
            </button>
          </div>
          <EthChart ethData={ethData} />
          <div className="age-btn-cont">
            <button
              onClick={() => {
                this.setState({ ethSelect: 'all' }, () => this.getEthData());
              }}
            >
              All users
            </button>
            <button
              onClick={() => {
                this.setState({ ethSelect: 'male' }, () => this.getEthData());
              }}
            >
              Males
            </button>
            <button
              onClick={() => {
                this.setState({ ethSelect: 'female' }, () => this.getEthData());
              }}
            >
              Females
            </button>
            <button
              onClick={() => {
                this.setState({ ethSelect: 'overlap' }, () =>
                  this.getEthData()
                );
              }}
            >
              Overlay
            </button>
          </div>
          <Link
            to="/admin/send"
            onClick={this.handleClick}
            className="email-link"
          >
            Send targeted e-mail
          </Link>
          <p>
            This will send an e-mail to all users who match the data above but
            don't have tickets! Fill out your message on the next page!
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  adminReducer,
  screeningReducer,
  userReducer,
  favoritesReducer
}) => ({
  ...adminReducer,
  ...screeningReducer,
  ...userReducer,
  ...favoritesReducer
});

export default connect(
  mapStateToProps,
  {
    getTheatres,
    getScreening,
    getUsersByGen,
    getUsersByAge,
    getUsersByEth,
    getUsersByGenre,
    getUsersByParams,
    clearAllData
  }
)(ScreeningData);
