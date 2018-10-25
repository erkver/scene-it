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
      genderData: {}
    };
  }

  componentDidMount() {
    const { getScreening, getAllUsers } = this.props;
    // const { id } = this.props.match.params;
    getScreening(77);
    getAllUsers(77)
    .then(response => {
      this.getGenderData();
    });
  }

  getGenderData = () => {
    const { users } = this.props;
    // console.log(Math.round(males), Math.round(females));
    // console.log(arr);
    this.setState({
      genderData: {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: users,
            backgroundColor: ["#347dc1", "#cc6594"],
            hoverBackgroundColor: ["#2768a4", "#b85887"]
          }
        ]
      }
    });
  }

  render() {
    const { screening, users } = this.props;
    const { genderData } = this.state;
    console.log(this.props);
    console.log(this.state);
    return (
      <div className="main-single-data-cont">
        <h1 className="title-text">{screening[0] && screening[0].title} Screening Data</h1>
        <div className="single-data-cont">
          <GenderChart
            genderData={genderData}
          />
          {users[0] > users[1]
            ?
            <>
              <p>This screening is popular among</p>
              <p className="male">males</p>
              <p>and account for {`${users[0]}%`} of interested attendees</p>
            </>
            :
            <>
              <p>This screening is popular among</p>
              <p className="female">females</p>
              <p>and account for {`${users[1]}%`} of interested attendees</p>
            </>
          }
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