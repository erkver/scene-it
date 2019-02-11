import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Ducks/userReducer';
import { getScreenings, getScreening } from '../../Ducks/screeningReducer';
import Movie from '../../Components/Movie/Movie';
import Spinner from '../../Components/Spinner/Spinner';
import './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getScreenings();
  }

  render() {
    const { screenings, user, getScreening } = this.props;
    let screeningList = screenings.map((movie, i) => (
      <div className="main-home-cont" key={i}>
        <Movie movie={movie} user={user} getScreening={getScreening} />
      </div>
    ));
    return (
      <div className="home-list-cont">
        <div>
          <h1 className="list-text">Screenings</h1>
        </div>
        {screenings[0] ? screeningList : <Spinner />}
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
)(Home);
