SELECT f.fav_id, u.email, u.gender, u.race, u.age, u.fav_genre FROM favorites f
JOIN users u ON f.userId = u.user_id
WHERE movieId = $1
AND userId > 4
AND age < 75;
