import React from "react";
import { Link } from "react-router-dom";
import "./Favorite.scss";

export default function Favorite(props) {
  const { fav, user, getScreening } = props;
  console.log(props);
  return (
    <div className="fav-cont">
      <div className="inner-fav-cont">
        <img
          src={fav.img_url}
          alt={fav.title}
          className="poster" />
        <p>Title: {fav.title}</p>
        <p>Screening Date: {fav.screening_date}</p>
        <p>Location: {fav.theatre_name}</p>
        <div className="btn-cont">
          <Link
            to={`/screening/${fav.movieid}`}
            className="info-btn"
            onClick={() => getScreening(fav.movieid)}>More Info ></Link>
        </div>
      </div>
    </div>
  );
}