SELECT *
FROM movies m
  JOIN theatres t ON m.theatreId = t.theatre_id
  WHERE m.id = $1;