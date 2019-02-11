import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScreening } from '../../Ducks/screeningReducer';
import { getFavorites } from '../../Ducks/favoritesReducer';
import { withRouter } from 'react-router-dom';
import Movie from '../../Components/Movie/Movie';
import './Watchlist.scss';

class Watchlist extends Component {
  componentDidMount() {
    const { getFavorites, user } = this.props;
    getFavorites(user.user_id);
  }

  render() {
    const { favorites, user } = this.props;
    let favList = favorites.map((movie, i) => (
      <div className="main-fav-cont" key={i}>
        <Movie movie={movie} user={user} getScreening={getScreening} />
      </div>
    ));
    return (
      <div className="fav-list-cont">
        <div>
          <h1 className="list-text">My Screenings</h1>
        </div>
        {favList}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, favoritesReducer }) => {
  const { user } = userReducer;
  const { favorites } = favoritesReducer;
  return { user, favorites };
};

export default withRouter(
  connect(
    mapStateToProps,
    { getFavorites, getScreening }
  )(Watchlist)
);
