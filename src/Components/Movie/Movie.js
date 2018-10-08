git import React from "react";

export default function Movie (props) {
  const { movie } = props;
  return (
    <div>
      <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
      <p>{movie.title}</p>
      <p>{movie.release_date}</p>
      <button>More Info</button>
    </div>
  );
}