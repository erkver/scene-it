INSERT INTO movies
  (title, img_url, release_date, synopsis, isScreening, screening_date, userId, studio, genre, mov_url, runtime, theatreId, seat_count)
VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
  RETURNING *;