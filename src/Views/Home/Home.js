import React,{ Component } from "react";
import { connect } from "react-redux";
import { getMovies, getScreening } from "../../Ducks/userReducer";
import Movie from "../../Components/Movie/Movie";
import "./Home.scss";

class Home extends Component {
  componentDidMount() {
    this.props.getMovies().then(res => console.log(res));
  }

  render() {
    const { movies, getScreening } = this.props;
    console.log(this.props);
    let movieList = movies && movies.map((movie, i) => (
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
        {movieList}
      </div>
    );
  }
}

const mapStateToProps = ({userReducer}) => ({...userReducer});

export default connect(mapStateToProps, {getMovies, getScreening})(Home);