import React from "react";
import "./Movie.scss";
import { Link } from "react-router-dom";

export default function Movie (props) {
  let divName = 'movie-cont';
  const { movie, getScreening, user, getMovie } = props;
  if(user.data && user.data.isadmin){
    divName = 'admin-movie-cont'
  };
  // console.log(props);
  return (
    <div className={divName}>
      {!(user.data && user.data.isadmin)
      ? <>
        {/* <img 
          src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
          alt={movie.title} 
          className="poster" /> */}
        <p>Title: {movie.title}</p>
        <p>Release Date: {movie.release_date}</p>
        <Link 
          to={`/screening/${movie.id}`} 
          className="info-btn"
          onClick={() => getScreening(movie.id)}>More Info</Link>
      </>
      : <>
        <p>{movie.title}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Fill info</p>
        <p>Passes Redeemed: 0/200</p>
        <p>Booking Ratio 1:1</p>
        <Link 
          to={`/admin/movie/${movie.id}`} 
          className="info-btn"
          onClick={() => getMovie(movie.id)}>More Info</Link>
        </>
      }
    </div>
  );
}