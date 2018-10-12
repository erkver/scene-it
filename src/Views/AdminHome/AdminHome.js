import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreenings, getScreening } from "../../Ducks/screeningReducer";
import { getUser } from "../../Ducks/userReducer";
import Movie from "../../Components/Movie/Movie";
import "./AdminHome.scss";
import { withRouter } from "react-router-dom";

class AdminHome extends Component {
  componentDidMount() {
    this.props.getScreenings();
    this.props.getUser();
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
          <h1 className="list-text">Admin Home</h1>
        </div>
        {screeningList}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, screeningReducer }) => ({ 
  ...userReducer, 
  ...screeningReducer 
});

export default withRouter(connect(mapStateToProps, { getScreenings, getScreening, getUser })(AdminHome));
