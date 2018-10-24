import React, { Component } from "react";
import { connect } from "react-redux";
import { addFavorite } from "../../Ducks/favoritesReducer";
import { withRouter } from "react-router-dom";
import { getScreening } from "../../Ducks/screeningReducer";
import './Screening.scss';

class Screening extends Component {
  constructor() {
    super();
    this.state = {
      claimed: false
    }
  }

  componentDidMount() {
    const { getScreening } = this.props;
    const { id } = this.props.match.params;
    getScreening(+id);
  }

  render() {
    let btnText = 'Get Passes!';
    if(this.state.claimed) {
      btnText = 'Claimed!'
    }
    const { screening, isAuthed, user } = this.props;
    console.log(this.props);
    let screeningInfo = screening.map((e, i) => (
      <div key={i} className="main-screening-cont">
        <h1 className="title-text">{e.title} screening</h1>
        <div className="screening-cont">
          <img
            src={e.img_url}
            alt={e.title}
            className="poster" />
          <p className="info-text">Title: {e.title}</p>
          <p className="info-text">Studio: {e.studio}</p>
          <p className="info-text">Release Date: {e.release_date}</p>
          <p className="info-text">Genre: {e.genre}</p>
          <p><a className="info-text" href={e.mov_url}>Film Homepage</a></p>
          <p className="info-text">Synopsis: {e.synopsis}</p>
          <p className="info-text">Runtime: {e.runtime} minutes</p>
          {!this.state.claimed
            ?
            <button
              className="add-btn"
              onClick={() => {
                !isAuthed
                ?
                alert("Must be logged in to get passes!")
                :
                this.setState({ claimed: !this.state.claimed }); 
                addFavorite(
                  e.id,
                  e.title,
                  e.img_url,
                  e.release_date,
                  e.synopsis,
                  true,
                  e.screening_date,
                  e.theatre_name,
                  e.theatre_address,
                  e.studio,
                  e.genre,
                  e.mov_url,
                  e.runtime,
                  e.userid
                )
              }}>{btnText}
            </button>
            :
            <p className="add-text">{btnText}</p>
          }
        </div>
      </div>
    ));
    return (
      <>
        {screeningInfo}
      </>
    );
  }
}

const mapStateToProps = ({ userReducer, favoritesReducer, screeningReducer }) => ({ ...userReducer, favoritesReducer, ...screeningReducer });

export default withRouter(connect(mapStateToProps, {addFavorite, getScreening})(Screening));
