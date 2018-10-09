import React,{ Component } from "react";
import { connect } from "react-redux";
import { getMovies, getScreening } from "../../Ducks/reducer";
import Movie from "../../Components/Movie/Movie";
import "./Home.scss";
// import { Link } from "react-router-dom";

class Home extends Component {
  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    const { movies, getScreening } = this.props;
    console.log(movies);
    let movieList = movies.map((movie, i) => (
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

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
}

export default connect(mapStateToProps, {getMovies, getScreening})(Home);