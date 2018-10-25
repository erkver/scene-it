import React,{ Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../Ducks/userReducer";
import { getScreenings, getScreening } from "../../Ducks/screeningReducer";
import { withRouter } from "react-router-dom";
import Movie from "../../Components/Movie/Movie";
import "./Home.scss";

class Home extends Component {
  componentDidMount() {
    const { getScreenings, getUser } = this.props;
    getScreenings();
    getUser();
  }
    
  render() {
    const { screenings, user } = this.props;
    setTimeout(console.log(this.props), 1000);
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie 
          movie={movie}
          user={user}
          getScreening={getScreening}
        />
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

const mapStateToProps = ({userReducer, screeningReducer}) => ({...userReducer, ...screeningReducer});

export default withRouter(connect(mapStateToProps, {getScreenings, getScreening, getUser})(Home));