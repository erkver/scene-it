import React from "react";
import "./Movie.scss";
import { Link } from "react-router-dom";

export default function Movie (props) {
  let divName = 'movie-cont';
  let innerDivName = 'inner-movie-cont'
  const { movie, user, getScreening } = props;
  // getFill(movie.id);
  if(user.data && user.data.isadmin){
    divName = 'admin-movie-cont'
    innerDivName = 'admin-inner-mov-cont'
  };
  // console.log(props);
  return (
    <div className={divName}>
      <div className={innerDivName}>
      {!(user && user.isadmin)
      ? <>
        <img 
          src={movie.img_url} 
          alt={movie.title} 
          className="poster" />
        <p>Title: {movie.title}</p>
        <p>Screening Date: {movie.screening_date}</p>
        <p>Location: {movie.theatre_name}</p>
        <div className="btn-cont">
          <Link 
            to={`/screening/${movie.id}`} 
            className="info-btn"
            onClick={() => getScreening(movie.id)}>More Info ></Link>
        </div>
       </> 
      :  <>
          <p>Film: {movie.title}</p>
          <p>Screening Date: {movie.screening_date}</p>
          <p>Location: {movie.theatre_name}</p>
          {/* <p>Passes Redeemed: {fill}/{movie.seat_count}</p>
          <p>Booking Ratio 1:1</p> */}
          <div className="btn-cont">
            <Link
              to={`/admin/screening/${movie.id}`}
              className="info-btn"
              onClick={() => getScreening(movie.id)}>More Info ></Link>
          </div>
        </>
      }  
      </div>
    </div>
  );
}
