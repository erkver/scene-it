import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFavorites } from '../../Ducks/favoritesReducer';
import { withRouter } from 'react-router-dom';
import { sendEmailAll } from '../../Ducks/adminReducer';
import { getScreening } from '../../Ducks/screeningReducer';
import GoogleMapReact from 'google-map-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './Screening.scss';

const Theatre = ({ text }) => <div className="marker">{text}</div>;

class Screening extends Component {
  constructor() {
    super();
    this.state = {
      claimed: false,
      center: {
        lat: null,
        lng: null
      }
    };
  }

  async componentDidMount() {
    const { getScreening, getFavorites, user } = this.props;
    const { id } = this.props.match.params;
    const result = await getScreening(+id);
    const { data } = result.value;
    this.setState({
      center: { lat: +data[0].latitude, lng: +data[0].longitude }
    });
    if (user.user_id) {
      const favResult = await getFavorites(user.user_id);
      const { data } = favResult.value;
      let matchMov = data.filter(
        fav => fav.movieid === result.value.data[0].id
      );
      let matchUser = data.filter(fav => fav.userid === user.user_id);
      if (matchMov.length && matchUser.length) {
        this.setState({ claimed: true });
      } else {
        this.setState({ claimed: false });
      }
    }
  }

  deleteFavorite = () => {
    const { favorites, screening } = this.props;
    let fav = favorites.filter(fav => fav.movieid === screening[0].id);
    axios
      .delete(`/api/favorite/${fav[0].fav_id}`)
      .then(() => {
        this.setState({ claimed: false }, () => this.props.history.push('/'));
      })
      .catch(err => console.log(err));
  };

  addFavorite = (movieId, userId) => {
    axios
      .post('/api/favorite', { movieId, userId })
      .then(() => this.setState({ claimed: true }))
      .catch(err => console.log(err));
  };

  addByText = (movieId, userId, to, body) => {
    this.addFavorite(movieId, userId);
    axios
      .post('/api/messages', { to, body })
      .then(() => console.log('Text sent'))
      .catch(err => console.log(err));
  };

  addByEmail = (movieId, userId, email, body, subject) => {
    this.addFavorite(movieId, userId);
    this.props
      .sendEmailAll(email, body, subject)
      .then(response => {
        if (response.value.data === 'Success') {
          this.setState({ claimed: true });
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    const { screening, isAuthed, user } = this.props;
    const { claimed, center } = this.state;
    const { REACT_APP_GOOGLE_KEY } = process.env;
    let screeningInfo = screening.map((e, i) => (
      <div key={i} className="main-screening-cont">
        <h1 className="title-text">{e.title} screening</h1>
        <div className="screening-cont">
          <div className="movie-info-cont">
            <img src={e.img_url} alt={e.title} className="poster" />
            <div className="inner-movie-info-cont">
              <p className="info-text">Title: {e.title}</p>
              <p className="info-text">Studio: {e.studio}</p>
              <p className="info-text">Release Date: {e.release_date}</p>
              <p className="info-text">Genre: {e.genre}</p>
              {!e.mov_url ? (
                ''
              ) : (
                <a className="info-text" href={e.mov_url}>
                  Film Homepage
                </a>
              )}
              <p className="info-text">
                Runtime: {!e.runtime ? 'TBD' : `${e.runtime} minutes`}
              </p>
              <p className="info-text">Synopsis: {e.synopsis}</p>
              <p className="info-text">Location: {e.theatre_name}</p>
            </div>
          </div>
          <div className="map-cont">
            <GoogleMapReact
              bootstrapURLKeys={{ key: REACT_APP_GOOGLE_KEY }}
              center={center}
              defaultZoom={12}
            >
              <Theatre
                lat={+e.latitude}
                lng={+e.longitude}
                text={<FontAwesomeIcon icon="map-pin" />}
              />
            </GoogleMapReact>
          </div>
          {!isAuthed ? (
            <p className="add-text">Login to get passes!</p>
          ) : !claimed ? (
            <>
              <h3>Claim your passes below!</h3>
              <div className="txt-btn-cont">
                <button
                  className="add-btn"
                  onClick={() =>
                    this.addByText(
                      e.id,
                      user.user_id,
                      +18173085007,
                      JSON.stringify(
                        `Here are your passes for ${screening[0].title}`
                      )
                    )
                  }
                >
                  Via text
                </button>
                <button
                  className="add-btn"
                  onClick={() =>
                    this.addByEmail(
                      e.id,
                      user.user_id,
                      [user.email],
                      `Here are your passes for ${screening[0].title}`,
                      `${screening[0].title} passes!`
                    )
                  }
                >
                  Via email
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="add-text">{claimed ? 'Claimed!' : 'Get Passes!'}</p>
              <button
                className="del-link"
                onClick={() => this.deleteFavorite()}
              >
                Click here to release your seats...
              </button>
            </>
          )}
        </div>
      </div>
    ));
    return <>{screeningInfo}</>;
  }
}
const mapStateToProps = ({
  userReducer,
  favoritesReducer,
  screeningReducer
}) => ({
  ...userReducer,
  ...favoritesReducer,
  ...screeningReducer
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      getScreening,
      getFavorites,
      sendEmailAll
    }
  )(Screening)
);
