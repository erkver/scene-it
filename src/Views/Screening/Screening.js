import React, { Component } from "react";
import { connect } from "react-redux";
import { addFavorite } from "../../Ducks/favoritesReducer";
import './Screening.scss';
import { withRouter } from "react-router-dom";

class Screening extends Component {
  constructor() {
    super();
    this.state = {
      claimed: false
    }
  }
  render() {
    let btnText = 'Get Passes!';
    if(this.state.claimed) {
      btnText = 'Claimed!'
    }
    const { screening, isAuthed, user } = this.props;
    console.log(this.props);
    return (
      <div className="main-screening-cont">
        <h1 className="title-text">{screening.title} screening</h1>
        <div className="screening-cont">
          <img
            src={`http://image.tmdb.org/t/p/w200/${screening.poster_path}`}
            alt={screening.title}
            className="poster" />
          <p className="info-text">Title: {screening.title}</p>
          <p className="info-text">Studio: {screening.production_companies &&screening.production_companies[0].name}</p>
          <p className="info-text">Release Date: {screening.release_date}</p>
          <p className="info-text">Genre: {screening.genres && screening.genres[0].name}</p>
          <p><a className="info-text" href={screening.homepage}>Film Homepage</a></p>
          <p className="info-text">Synopsis: {screening.overview}</p>
          <p className="info-text">Runtime: {screening.runtime} minutes</p>
          {!this.state.claimed
            ? 
            <button 
                className="add-btn" 
                onClick={() => {!isAuthed
                  ?
                  alert("Must be logged in to get passes!")
                  :
                  this.setState({ claimed: !this.state.claimed }); addFavorite(
                    screening.id,
                    screening.title, 
                    screening.poster_path,
                    screening.release_date,
                    screening.overview,
                    true,
                    "TBD",
                    "TBD",
                    "TBD",
                    screening.production_companies[0].name,
                    screening.genres[0].name,
                    screening.homepage,
                    screening.runtime,
                    user.data.user_id
                  )}}>{btnText}
            </button>
            : 
            <p className="add-text">{btnText}</p>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, favoritesReducer, screeningReducer }) => ({ ...userReducer, favoritesReducer, ...screeningReducer });

export default withRouter(connect(mapStateToProps, {addFavorite})(Screening));
