INSERT INTO favorites (movieId, userId)
VALUES ($1, $2)
RETURNING *;