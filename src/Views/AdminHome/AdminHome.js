import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScreenings, getScreening } from '../../Ducks/screeningReducer';
import { getUser } from '../../Ducks/userReducer';
import Movie from '../../Components/Movie/Movie';
import Spinner from '../../Components/Spinner/Spinner';
import './AdminHome.scss';

class AdminHome extends Component {
  componentDidMount() {
    this.props.getScreenings();
    this.props.getUser();
  }

  renderContent = () => {
    const { screenings, user } = this.props;
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie movie={movie} getScreening={getScreening} user={user} />
      </div>
    ));
    return <>{screeningList}</>;
  };

  render() {
    const { screenings } = this.props;
    return (
      <div className="movie-list-cont">
        <h1>Screenings</h1>
        {screenings[0] ? this.renderContent() : <Spinner />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.userReducer;
  const { screenings } = state.screeningReducer;
  return { user, screenings };
};

export default connect(
  mapStateToProps,
  { getScreenings, getScreening, getUser }
)(AdminHome);
