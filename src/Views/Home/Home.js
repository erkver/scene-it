import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../Ducks/userReducer';
import { getScreenings, getScreening } from '../../Ducks/screeningReducer';
import Movie from '../../Components/Movie/Movie';
import './Home.scss';

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getScreenings();
  }

  render() {
    const { screenings, user, getScreening } = this.props;
    console.log(this.props);
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
        {screeningList}
      </div>
    );
  }
}

const mapStateToProps = ({ userReducer, screeningReducer }) => {
  const { user } = userReducer;
  const { screenings, screening } = screeningReducer;
  return { user, screenings, screening };
};

export default connect(
  mapStateToProps,
  { getScreenings, getScreening, getUser }
)(Home);
