import React from "react";
import "./Movie.scss";
import { Link } from "react-router-dom";

export default function Movie (props) {
  let divName = 'movie-cont';
  let innerDivName = 'inner-movie-cont'
  const { movie, getScreeningInfo, user, getScreening } = props;
  if(user.data && user.data.isadmin){
    divName = 'admin-movie-cont'
    innerDivName = 'admin-inner-mov-cont'
  };
  // console.log(props);
  return (
    <div className="admin-movie-cont">
      <div className="admin-inner-mov-cont">
      {/* {!(user.data && user.data.isadmin)
      ? <>
        {/* <img 
          src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} 
          alt={movie.title} 
          className="poster" /> */}
        {/* <p>Title: {movie.title}</p>
        <p>Release Date: {movie.release_date}</p>
        <Link 
          to={`/screening/${movie.id}`} 
          className="info-btn"
          onClick={() => getScreeningInfo(movie.id)}>More Info</Link>
      </> */}
      {/*  <>
        <p>{movie.title}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Fill info</p>
        <p>Passes Redeemed: 0/200</p>
        <p>Booking Ratio 1:1</p>
        <Link 
          to={`/admin/movie/${movie.id}`} 
          className="info-btn"
          onClick={() => {console.log(movie.id); getScreening(movie.id)}}>More Info</Link>
        </>
      }  */}

        <p>Film: {movie.title}</p>
        <p>Screening Date: {movie.screening_date}</p>
        <p>Passes Redeemed: 0/{movie.seat_count}</p>
        <p>Booking Ratio 1:1</p>
        <div className="btn-cont">
          <Link
            to={`/admin/screening/${movie.id}`}
            className="info-btn"
            onClick={() => getScreening(movie.id)}>More Info ></Link>
        </div>
      </div>
    </div>
  );
}