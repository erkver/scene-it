import React, { Component } from "react";
import { connect } from "react-redux";
import './Screening.css';

class Screening extends Component {
  render() {
    const { movies } = this.props;
    console.log(movies);
    return (
      <div className="main-screening-cont">
          <p className="title-text">{movies.title} screening</p>
        <div className="screening-cont">
            <img
              src={`http://image.tmdb.org/t/p/w200/${movies.poster_path}`}
              alt={movies.title}
              className="poster" />
            <p className="info-text">Title: {movies.title}</p>
            <p className="info-text">Studio: {movies.production_companies && movies.production_companies[0].name}</p>
            <p className="info-text">Release Date: {movies.release_date}</p>
            <p className="info-text">Genre: {movies.genres && movies.genres[0].name}</p>
            <a className="info-text"href={movies.homepage}>Film Homepage</a>
            <p className="info-text">Synopsis: {movies.overview}</p>
            <p className="info-text">Runtime: {movies.runtime} minutes</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { movies } = state;
  return {movies} 
}

export default connect(mapStateToProps)(Screening);
