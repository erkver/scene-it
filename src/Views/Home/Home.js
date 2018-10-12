import React,{ Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../Ducks/userReducer";
import { getScreenings, getScreeningInfo } from "../../Ducks/screeningReducer";
import Movie from "../../Components/Movie/Movie";
import "./Home.scss";
import { withRouter } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.getScreenings();
    this.props.getUser();
  }
    
  render() {
    const { screenings, getScreeningInfo, user } = this.props;
    setTimeout(console.log(this.props), 1000);
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie 
          movie={movie}
          user={user}
          getScreeningInfo={getScreeningInfo}
        />
      </div>
  ));
    return (
      <div className="movie-list-cont">
        <div>
          <h1 className="list-text">Screenings</h1>
        </div>      
        {screeningList}
      </div>
    );
  }
}

const mapStateToProps = ({userReducer, screeningReducer}) => ({...userReducer, ...screeningReducer});

export default withRouter(connect(mapStateToProps, {getScreenings, getScreeningInfo, getUser})(Home));