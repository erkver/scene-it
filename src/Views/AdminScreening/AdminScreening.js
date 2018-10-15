import React, { Component } from "react";
import { connect } from "react-redux";
// import { addFavorite } from "../../Ducks/adminReducer";
import "./AdminScreening.scss";
import { withRouter } from "react-router-dom";

class AdminScreening extends Component {
  render() {
    const { screening } = this.props;
    console.log(screening[0] && screening[0].title);
    return (
      <div className="main-single-screening-cont">
        <h1 className="title-text">{screening[0] && screening[0].title} Info</h1>
        <div className="single-screening-cont">
          <img
            src={screening[0] && screening[0].img_url}
            alt={screening[0] && screening[0].title}
            className="poster" />
          <p 
            className="info-text">Title: {screening[0] && screening[0].title}</p>
          <p 
            className="info-text">Studio: {screening[0] && screening[0].studio}</p>
          <p 
            className="info-text">Release Date: {screening[0] && screening[0].release_date}</p>
          <p 
            className="info-text">Runtime: {screening[0] && screening[0].runtime} minutes</p>
          <p 
            className="info-text">Screening Date: {screening[0] && screening[0].screening_date}</p>
          <p 
            className="info-text">Theatre: {screening[0] && screening[0].theatre_name}</p>
          <p 
            className="info-text">Seat Count: {screening[0] && screening[0].seat_count}</p>
          <button
            className="add-btn"
            onClick={() => console.log()}>Edit Screening
          </button>
        </div>
      </div>
    );      
  }
}

const mapStateToProps = ({ userReducer, adminReducer, screeningReducer }) => ({
  ...userReducer,
  ...adminReducer,
  ...screeningReducer
});

export default withRouter(connect(mapStateToProps)(AdminScreening));

// addFavorite(
//   screening.id,
//   screening.title,
//   screening.poster_path,
//   screening.release_date,
//   screening.overview,
//   true,
//   "TBD",
//   "TBD",
//   "TBD",
//   screening.production_companies[0].name,
//   screening.genres[0].name,
//   screening.homepage,
//   screening.runtime,
//   admin.data.user_id
// )