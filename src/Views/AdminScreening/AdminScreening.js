import React, { Component } from "react";
import { connect } from "react-redux";
// import { addFavorite } from "../../Ducks/adminReducer";
import './AdminScreening.scss';
import { withRouter } from "react-router-dom";

class AdminScreening extends Component {
  render() {
    const { movies } = this.props;
    console.log(this.props);
    return (
      <div className="main-single-movie-cont">
        <h1 className="title-text">{movies.title} Info</h1>
        <div className="single-movie-cont">
          <img
            src={`http://image.tmdb.org/t/p/w92/${movies.poster_path}`}
            alt={movies.title}
            className="poster" />
          <p className="info-text">Title: {movies.title}</p>
          <p className="info-text">Studio: {movies.production_companies && movies.production_companies[0].name}</p>
          <p className="info-text">Release Date: {movies.release_date}</p>
          <p className="info-text">Genre: {movies.genres && movies.genres[0].name}</p>
          <p><a className="info-text" href={movies.homepage}>Film Homepage</a></p>
          <p className="info-text">Synopsis: {movies.overview}</p>
          <p className="info-text">Runtime: {movies.runtime} minutes</p>
          <button
            className="add-btn"
            onClick={() => {
              this.setState({ claimed: !this.state.claimed }); 
            }}>Edit Screening
          </button>
        </div>
      </div>
    );      
  }
}

const mapStateToProps = ({ userReducer, adminReducer }) => ({
  ...userReducer,
  ...adminReducer
});

export default withRouter(connect(mapStateToProps)(AdminScreening));

// addFavorite(
//   movies.id,
//   movies.title,
//   movies.poster_path,
//   movies.release_date,
//   movies.overview,
//   true,
//   "TBD",
//   "TBD",
//   "TBD",
//   movies.production_companies[0].name,
//   movies.genres[0].name,
//   movies.homepage,
//   movies.runtime,
//   admin.data.user_id
// )