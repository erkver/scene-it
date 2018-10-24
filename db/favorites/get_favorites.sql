SELECT f.fav_id, f.movieId, f.userId, m.title, m.screening_date, m.img_url, t.theatre_name FROM favorites f
JOIN movies m ON f.movieId = m.id
JOIN theatres t ON m.theatreId = t.theatre_id
WHERE f.userId = $1;