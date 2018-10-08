import React,{ Component } from "react";
import { connect } from "react-redux";
import { getMovies } from "../../Ducks/reducer";
import Movie from "../../Components/Movie/Movie";

class Home extends Component {

  componentDidMount() {
    this.props.getMovies();
  }

  render() {
    // const { movies } = this.props;
    console.log(this.props.movies);
    let movieList = this.props.movies.map((movie, i) => (
      <div key={i}>
        <Movie 
          movie={movie}
        />
      </div>
  ));
    return (
      <div>
      <p>Movies</p>
        {movieList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
}

export default connect(mapStateToProps, {getMovies})(Home);