SELECT m.title, m.screening_date, t.theatre_name FROM favorites f
JOIN movies m ON f.movieId = m.id
JOIN theatres t ON m.theatreId = t.theatre_id
WHERE f.userId = $1;