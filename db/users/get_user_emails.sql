-- SELECT DISTINCT u.email FROM users u
-- JOIN favorites f ON u.user_id = f.userId
-- WHERE f.movieId != $1 AND
-- ($2 IS null or u.gender = $2) AND 
-- ($3 IS null or u.race = $3) AND
-- ($4 IS null or u.age >= $4) AND
-- ($5 IS null or u.age <= $5) AND 
-- ($6 IS null or u.fav_genre = $6);

SELECT DISTINCT u.email
(CASE WHEN u.gender = $2 THEN '%' END),
  (CASE WHEN u.race LIKE '%' || $3 || '%' THEN '%' END),
  (CASE WHEN u.age >= $4 THEN 0 END),
  (CASE WHEN u.age <= $5 THEN 100 END),
  (CASE WHEN u.fav_genre LIKE '%' || $6 || '%' THEN '%' END)
FROM users u
  JOIN favorites f ON u.user_id = f.userId
WHERE f.movieId != $1;

