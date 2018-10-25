SELECT * FROM movies m
JOIN theatres t ON m.theatreId = t.theatre_id
WHERE title LIKE $1;