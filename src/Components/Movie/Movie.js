import React from 'react';
import { Link } from 'react-router-dom';
import './Movie.scss';

export default function Movie(props) {
  let divName = 'movie-cont';
  let innerDivName = 'inner-movie-cont';
  const { movie, user, getScreening } = props;
  if (user.data && user.data.isadmin) {
    divName = 'admin-movie-cont';
    innerDivName = 'admin-inner-mov-cont';
  }
  return (
    <div className={divName}>
      <div className={innerDivName}>
        {!(user && user.isadmin) ? (
          <>
            <img src={movie.img_url} alt={movie.title} className="poster" />
            <p>Title: {movie.title}</p>
            <p>Screening Date: {movie.screening_date}</p>
            <p>Location: {movie.theatre_name}</p>
            <div className="btn-cont">
              <Link
                onMouseOver={() => getScreening(movie.id || movie.movieid)}
                to={`/screening/${movie.id || movie.movieid}`}
                className="info-btn"
              >
                More Info >
              </Link>
            </div>
          </>
        ) : (
          <>
            <p>Film: {movie.title}</p>
            <p>Screening Date: {movie.screening_date}</p>
            <p>Location: {movie.theatre_name}</p>
            <div className="btn-cont">
              <Link
                onMouseOver={() => getScreening(movie.id || movie.movieid)}
                to={`/admin/screening/${movie.id || movie.movieid}`}
                className="info-btn"
              >
                More Info >
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
