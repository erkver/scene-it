SELECT tr.tR_id, m.title, t.theatre_name, tr.attendance, m.seat_count, tr.ratio
FROM testReport tr
  JOIN movies m ON tr.movieId = m.id
  JOIN theatres t ON m.theatreId = t.theatre_id;