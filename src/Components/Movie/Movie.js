import React from "react";
import "./Movie.css";
import { Link } from "react-router-dom";

export default function Movie (props) {
  const { movie, getScreening } = props;
  return (
    <div className="movie-cont">
      <img 
        src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
        alt={movie.title} 
        className="poster" />
      <p>Title: {movie.title}</p>
      <p>Release Date: {movie.release_date}</p>
      <Link 
        to={`/screening/${movie.id}`} 
        className="info-btn"
        onClick={() => getScreening(movie.id)}>More Info</Link>
    </div>
  );
}