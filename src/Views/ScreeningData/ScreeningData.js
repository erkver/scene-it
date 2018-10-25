import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreening } from "../../Ducks/screeningReducer";
import { withRouter, Link } from "react-router-dom";
import { getTheatres } from "../../Ducks/theatreReducer";
import { getAllUsers } from "../../Ducks/adminReducer";
import GenderChart from "../../Components/GenderChart/GenderChart";
import "react-datepicker/dist/react-datepicker.css";
import "./ScreeningData.scss";

class ScreeningData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderData: this.getGenderData()
    };
  }

  componentDidMount() {
    const { getScreening, getAllUsers } = this.props;
    // const { id } = this.props.match.params;
    getScreening(77);
    getAllUsers(77).then(response => {
      console.log(response);
      const { data } = response.value;
      let males = ((data.filter(user => user.gender.includes('Male')).length / data.length) * 100);
      let females = ((data.filter(user => user.gender.includes('Female')).length / data.length) * 100);
      this.getGenderData(males, females);
    });
  }

  componentDidUpdate(prevProps) {
    const { genderData } = this.state;
    const { users } = this.props;
    if(genderData.length !== prevProps.genderData.length) {
      let males = ((users.filter(user => user.gender.includes('Male')).length / users.length) * 100);
      let females = ((users.filter(user => user.gender.includes('Female')).length / users.length) * 100);
      this.getGenderData(males, females);
    }
  }

  getGenderData(males, females) {
    // const { users } = this.props;
    console.log(males, females);
    return {genderData: {
      labels: [
        'Male',
        'Female'
      ],
      datasets: [{
        data: [males , females],
        backgroundColor: [
          '#347dc1',
          '#cc6594'
        ],
        hoverBackgroundColor: [
          '#2768a4',
          '#b85887'
        ]
      }]
    }}
  }

  render() {
    const { screening, users } = this.props;
    const { genderData } = this.state;
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="main-single-data-cont">
        <h1 className="title-text">{screening.title} Screening Data</h1>
        <div className="single-data-cont">
          <GenderChart
            genderData={genderData}
          />
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

export default withRouter(connect(mapStateToProps, { getTheatres, getScreening, getAllUsers })(ScreeningData));