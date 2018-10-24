import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreenings, getScreening } from "../../Ducks/screeningReducer";
import { getUser } from "../../Ducks/userReducer";
import { getReport } from "../../Ducks/reportReducer";
import { withRouter } from "react-router-dom";
import Movie from "../../Components/Movie/Movie";
import "./AdminHome.scss";

class AdminHome extends Component {
  componentDidMount() {
    const { getScreenings, getUser } = this.props;
    getScreenings();
    getUser();
    // this.props.getReport(65);
  }

  componentDidUpdate(prevProps) {
    const { screenings, getScreenings } = this.props;
    if(screenings.length !== prevProps.screenings.length) {
      getScreenings();
    }
  }

  render() {
    const { getScreening, user, screenings } = this.props;
    console.log(this.props);
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie
          movie={movie}
          getScreening={getScreening}
          user={user}
        />
      </div>
    ));
    return (
      <div className="movie-list-cont">
        <div>
          <h1 className="list-text">Screenings</h1>
        </div>
        {screeningList}
      </div>
    );
  }
}

const mapStateToProps = ({ 
  userReducer, 
  screeningReducer,
  reportReducer }) => ({ 
  ...userReducer, 
  ...screeningReducer,
  ...reportReducer 
});

export default withRouter(connect(mapStateToProps, { getScreenings, getScreening, getUser, getReport })(AdminHome));
