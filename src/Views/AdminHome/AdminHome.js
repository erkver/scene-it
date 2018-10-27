import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreenings, getScreening } from "../../Ducks/screeningReducer";
import { getUser } from "../../Ducks/userReducer";
import { getReport } from "../../Ducks/reportReducer";
import { getFill } from "../../Ducks/favoritesReducer";
import { withRouter } from "react-router-dom";
import Movie from "../../Components/Movie/Movie";
import "./AdminHome.scss";

class AdminHome extends Component {
  componentDidMount() {
    const { getScreenings, getUser } = this.props;
    getScreenings();
    getUser();
  }

  componentDidUpdate(prevProps) {
    const { screenings, getScreenings } = this.props;
    if(screenings.length !== prevProps.screenings.length) {
      getScreenings();
    }
  }

  renderContent = () => {
    const { screenings, user } = this.props;
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie
          movie={movie}
          getScreening={getScreening}
          user={user}
        />
      </div>
    ));
    return (<>{screeningList}</>);
  }

  render() {
    const { screenings } = this.props;
    console.log(this.props);
    return (
      <div className="movie-list-cont">
      <h1>Screenings</h1>
        {screenings[0]
        ? this.renderContent()
        : <p>Loading...</p>}
      </div>
    );
  }
}

const mapStateToProps = ({ 
  userReducer, 
  screeningReducer,
  reportReducer,
  favoritesReducer }) => ({ 
  ...userReducer, 
  ...screeningReducer,
  ...reportReducer,
  ...favoritesReducer 
});

export default withRouter(connect(mapStateToProps, { getScreenings, getScreening, getUser, getReport, getFill })(AdminHome));
