import React,{ Component } from "react";
import { connect } from "react-redux";
import { getScreenings, getScreening, getUser } from "../../Ducks/userReducer";
import Movie from "../../Components/Movie/Movie";
import "./Home.scss";

class Home extends Component {
  componentDidMount() {
    this.props.getScreenings();
    this.props.getUser();
  }

  // componentDidUpate(prevProps) {
  //   prevPMovie}

  render() {
    const { screenings, getScreening } = this.props;
    console.log(this.props);
    let screeningList = screenings.map((movie, i) => (
      <div className="main-movie-cont" key={i}>
        <Movie 
          movie={movie}
          getScreening={getScreening}
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

const mapStateToProps = ({userReducer}) => ({...userReducer});

export default connect(mapStateToProps, {getScreenings, getScreening, getUser})(Home);