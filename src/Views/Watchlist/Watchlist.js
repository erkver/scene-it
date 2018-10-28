import React, { Component } from "react";
import { connect } from "react-redux";
import { getScreening } from "../../Ducks/screeningReducer";
import { getFavorites } from "../../Ducks/favoritesReducer";
import { withRouter } from "react-router-dom";
import Favorite from "../../Components/Favorite/Favorite";
import "./Watchlist.scss";

class Watchlist extends Component {
  componentDidMount() {
    const { getFavorites, user } = this.props;
    getFavorites(user.user_id);
  }

  render() {
    const { favorites, user } = this.props;
    // console.log(this.props);
    let favList = favorites.map((fav, i) => (
      <div className="main-fav-cont" key={i}>
        <Favorite
          fav={fav}
          user={user}
          getScreening={getScreening}
        />
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

const mapStateToProps = ({ 
  userReducer, 
  screeningReducer,
  favoritesReducer }) => ({ 
  ...userReducer, 
  ...screeningReducer,
  ...favoritesReducer });

export default withRouter(connect(mapStateToProps, { getFavorites, getScreening })(Watchlist));