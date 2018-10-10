INSERT INTO favorites (movieId, fav_title, fav_img_url, fav_release_date, fav_synopsis, fav_isScreening, fav_screening_date, fav_theatre_name, fav_theatre_location, fav_studio, fav_genre,
fav_mov_url, fav_runtime, userId)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
RETURNING *;