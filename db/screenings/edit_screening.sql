UPDATE movies
SET screening_date = $2, theatreId = $3, seat_count = $4
WHERE id = $1;
SELECT *
FROM movies m
  JOIN theatres t ON m.theatreId = t.theatre_id;