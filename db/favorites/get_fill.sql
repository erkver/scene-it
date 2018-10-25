SELECT COUNT(movieId) * 2 AS TOTAL
FROM favorites
WHERE movieId = $1;