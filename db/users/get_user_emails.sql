SELECT DISTINCT u.email
FROM favorites f
  JOIN users u ON f.userId = u.user_id
WHERE f.movieId != $1
  AND u.gender = COALESCE($2, '%')
  AND u.race LIKE COALESCE('%' || $3 || '%', '%')
  AND u.age >= COALESCE($4, 0)
  AND u.age <= COALESCE($5, 80)
  AND u.fav_genre LIKE COALESCE('%' || $6 || '%', '%');
