SELECT DISTINCT u.email FROM users u
JOIN favorites f ON u.user_id = f.userId
WHERE f.movieId != $1 AND
($2 IS null or u.gender = $2) AND 
($3 IS null or u.race = $3) AND
($4 IS null or u.age >= $4) AND
($5 IS null or u.age <= $5) AND 
($6 IS null or u.fav_genre = $6);

