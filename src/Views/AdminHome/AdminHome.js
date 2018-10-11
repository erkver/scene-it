import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, getMovie } from "../../Ducks/adminReducer";
import { getUser } from "../../Ducks/userReducer";
import Movie from "../../Components/Movie/Movie";
import "./AdminHome.scss";
import { withRouter } from "react-router-dom";

class AdminHome extends Component {
  componentDidMount() {
    this.props.getMovies();
    this.props.getUser();
  }

  render() {
    const { movies, getMovie, user } = this.props;
    console.log(this.props);
    let screeningList = movies.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie
          movie={movie}
          getMovie={getMovie}
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

const mapStateToProps = ({ userReducer, adminReducer }) => ({ ...userReducer, ...adminReducer });

export default withRouter(connect(mapStateToProps, { getMovies, getMovie, getUser })(AdminHome));
