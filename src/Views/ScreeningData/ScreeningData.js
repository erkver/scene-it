import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreening } from "../../Ducks/screeningReducer";
import { withRouter, Link } from "react-router-dom";
import { getTheatres } from "../../Ducks/theatreReducer";
import { getUsersByGen, getUsersByAge } from "../../Ducks/adminReducer";
import GenderChart from "../../Components/GenderChart/GenderChart";
import "react-datepicker/dist/react-datepicker.css";
import "./ScreeningData.scss";
import AgeChart from "../../Components/AgeChart/AgeChart";

class ScreeningData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: {},
      ageData: {},
      ageSelect: "all"
    };
  }

  componentDidMount() {
    const { getScreening, getUsersByGen, getUsersByAge } = this.props;
    // const { id } = this.props.match.params;
    getScreening(83);
    getUsersByGen(83)
    .then(response => {
      this.getGenderData();
    });
    getUsersByAge(83).then(res => {
      console.log(res);
      this.getAgeData();
    });
  }

  // componentDidUpdate(prevProps) {
  //   const { ageSelect } = this.state;
  //   console.log(prevProps);
  //   if(ageSelect !== prevProps.ageSelect) {
  //     this.getAgeData();
  //   }
  // } 

  getGenderData = () => {
    const { gender } = this.props;
    this.setState({
      genderData: {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: gender,
            backgroundColor: ["#347dc1", "#cc6594"],
            hoverBackgroundColor: ["#2768a4", "#b85887"]
          }
        ]
      }
    });
  }

  getAgeData = () => {
    const { age } = this.props;
    const { ageSelect } = this.state;
    if(ageSelect === 'all') {
      this.setState({
        ageData: {
          labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
          datasets: [
            {
              label: "All",
              data: age[0],
              backgroundColor: "rgba(52,125,193,0.2)",
              borderColor: "rgba(52,125,193,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(39,104,164,0.4)",
              hoverBorderColor: "rgba(39,104,164,1)"
            }
          ]
        }
      });
    } else if(ageSelect === "male") {
      this.setState({
        ageData: {
          labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
          datasets: [
            {
              label: "Males",
              data: age[1],
              backgroundColor: "rgba(52,125,193,0.2)",
              borderColor: "rgba(52,125,193,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(39,104,164,0.4)",
              hoverBorderColor: "rgba(39,104,164,1)"
            }
          ]
        }
      });
    } else if(ageSelect === 'female') {
      this.setState({
        ageData: {
          labels: ["18-24", "25-34", "35-44", "45-54", "55+"],
          datasets: [
            {
              label: "Females",
              data: age[2],
              backgroundColor: "rgba(204,101,148,0.2)",
              borderColor: "rgba(204,101,148,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(184,88,135,0.4)",
              hoverBorderColor: "rgba(184,88,135,1)"
            }
          ]
        }
      });
    }
  }

  render() {
    const { screening, gender } = this.props;
    const { genderData, ageData } = this.state;
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="main-single-data-cont">
        <h1 className="title-text">{screening[0] && screening[0].title} Screening Data</h1>
        <div className="single-data-cont">
          <GenderChart
            genderData={genderData}
          />
          {gender[0] > gender[1]
            ?
            <>
              <p>This screening is popular among</p>
              <p className="male">males</p>
              <p>accounting for {`${gender[0]}%`} of interested attendees</p>
            </>
            :
            <>
              <p>This screening is popular among</p>
              <p className="female">females</p>
              <p>accounting for {`${gender[1]}%`} of interested attendees</p>
            </>
          }
          <AgeChart
            ageData={ageData}
          />
          <div className="age-btn-cont">
            <button onClick={() => {this.setState({ageSelect: "all"}); setTimeout(this.getAgeData(), 200)}}>All users</button>
            <button onClick={() => {this.setState({ageSelect: "male"}); setTimeout(this.getAgeData(), 200)}}>Males</button>
            <button onClick={() => {this.setState({ageSelect: "female"}); setTimeout(this.getAgeData(), 200)}}>Females</button>
          </div>
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

export default withRouter(
  connect(
    mapStateToProps,
    { getTheatres, getScreening, getUsersByGen, getUsersByAge }
  )(ScreeningData)
);