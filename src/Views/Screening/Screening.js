import React, { Component } from "react";
import { connect } from "react-redux";
import { addFavorite, getFavorites, deleteFavorite } from "../../Ducks/favoritesReducer";
import { withRouter, Link } from "react-router-dom";
import { sendEmailAll, sendText } from "../../Ducks/adminReducer";
import { getScreening } from "../../Ducks/screeningReducer";
import GoogleMapReact from 'google-map-react';
import './Screening.scss';

const Theatre = ({ text }) => <div>{text}</div>;

class Screening extends Component {
  constructor() {
    super();
    this.state = {
      claimed: false
    }
  }

  componentDidMount() {
    const { getScreening, getFavorites, user } = this.props;
    const { id } = this.props.match.params;
    getScreening(+id).then(response => {
      // console.log(response);
      // const { data } = response.value;
        getFavorites(user.user_id).then(res => {
        const { data } = res.value;
        // console.log(res);
        let matchMov = data.filter(fav => fav.movieid === response.value.data[0].id);
        let matchUser = data.filter(fav => fav.userid === user.user_id);
        // console.log(matchMov, matchUser);
        ((matchMov.length && matchUser.length) 
          ? this.setState({claimed: true}) 
          : this.setState({claimed: false}));
        })
    });
  }

  handleDelete = () => {
    const { favorites, screening, deleteFavorite } = this.props;
    let fav = favorites.filter(fav => fav.movieid === screening[0].id);
    deleteFavorite(fav[0].fav_id);
    this.setState({ claimed: false });
  }

  addByText = () => {
    const { addFavorite, screening, user, sendText } = this.props;
    addFavorite(screening[0].id, user.user_id);
    // console.log(screening[0].id, user.user_id);
    sendText(+18173085007, JSON.stringify(`Here are your passes for ${screening[0].title}`));
    this.setState({ claimed: !this.state.claimed });
  }

  addByEmail = () => {
    const { addFavorite, screening, user, sendEmailAll } = this.props;
    addFavorite(screening[0].id, user.user_id);
    // console.log(screening[0].id, user.user_id);
    sendEmailAll([user.email], `Here are your passes for ${screening[0].title}`, `${screening[0].title} passes!`);
    this.setState({ claimed: !this.state.claimed });
  }

  render() {
    const { screening, isAuthed } = this.props;
    const { claimed } = this.state;
    const { REACT_APP_GOOGLE_KEY } = process.env;
    let btnText = 'Get Passes!';
    if(claimed) {
      btnText = 'Claimed!'
    }
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
          {!e.mov_url ? <></> :
           <p><a className="info-text" href={e.mov_url}>Film Homepage</a></p>
          }
          <p className="info-text">Synopsis: {e.synopsis}</p>
          <p className="info-text">Runtime: {!e.runtime ? "TBD" : `${e.runtime} minutes`}</p>
          <p className="info-text">Location: {e.theatre_name}</p>
          {!isAuthed
            ?
            <p className="add-text">Login to get passes!</p>
            :
            (!claimed
              ? 
              (<>
                <h3>Claim your passes below!</h3>
                <div className="txt-btn-cont">
                <button
                  className="add-btn"
                  onClick={() => this.addByText()}>Via text
                </button>
                <button
                className="add-btn"
                  onClick={() => this.addByEmail()}>Via email
                </button>
              </div>
              </>)
              :
              (<>
                <p className="add-text">{btnText}</p>
                <Link 
                  to="/"
                  className="del-link"
                  onClick={() => this.handleDelete()}
                  >Click here to release your seats...</Link>
                <div style={{ height: '25vh', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: REACT_APP_GOOGLE_KEY }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                  >
                    <Theatre
                      lat={e.latitude}
                      lng={e.longitude}
                      text={e.theatre_name}
                    />
                  </GoogleMapReact>
                </div>
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
  screeningReducer,
  adminReducer }) => ({ 
  ...userReducer, 
  ...favoritesReducer, 
  ...screeningReducer,
  ...adminReducer });

export default withRouter(connect(mapStateToProps, { addFavorite, getScreening, getFavorites, deleteFavorite, sendEmailAll, sendText})(Screening));
