SELECT ROUND((SUM(CASE WHEN u.gender = 'Male' THEN 1 END)*100)
::NUMERIC / COUNT
(*), 0) AS male,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS female
FROM favorites f 
JOIN users u ON f.userId = u.user_id
WHERE movieId = $1;