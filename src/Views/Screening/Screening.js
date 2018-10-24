import React, { Component } from "react";
import { connect } from "react-redux";
import { addFavorite, getFavorites, deleteFavorite } from "../../Ducks/favoritesReducer";
import { withRouter, Link } from "react-router-dom";
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
    const { getScreening, getFavorites, user, screening } = this.props;
    const { id } = this.props.match.params;
    getScreening(+id).then(response => {
      console.log(response);
      const { data } = response.value;
        getFavorites(data[0].userid).then(res => {
        const { data } = res.value;
          console.log(res);
        let matchMov = data.filter(fav => fav.movieid === response.value.data[0].id);
        let matchUser = data.filter(fav => fav.userid === user.user_id);
        console.log(matchMov, matchUser);
        ((matchMov.length && matchUser.length) ? this.setState({claimed: true}) : this.setState({claimed: false}));
        })
    });
  }


  render() {
    const { screening, isAuthed, user, deleteFavorite, favorites } = this.props;
    const { claimed } = this.state;
    let btnText = 'Get Passes!';
    if(claimed) {
      btnText = 'Claimed!'
    }
    let fav = favorites.filter(fav => fav.movieid === screening[0].id);
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
          {!isAuthed
            ?
            <p className="add-text">Login to get passes!</p>
            :
            (!claimed
              ? 
              (<button
                className="add-btn"
                onClick={() => {
                  this.setState({ claimed: !this.state.claimed });
                  addFavorite(e.id, user.user_id)
                }}>{btnText}
              </button>)
              :
              (<>
                <p className="add-text">{btnText}</p>
                <Link 
                  to="/"
                  className="del-link"
                  onClick={() => {
                    console.log(fav);
                    deleteFavorite(fav[0].fav_id);
                    this.setState({claimed: false})}}
                  >Click here to release your seats...</Link>
                </>)
            )
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

const mapStateToProps = ({ 
  userReducer, 
  favoritesReducer, 
  screeningReducer }) => ({ 
  ...userReducer, 
  ...favoritesReducer, 
  ...screeningReducer });

export default withRouter(connect(mapStateToProps, { addFavorite, getScreening, getFavorites, deleteFavorite})(Screening));
