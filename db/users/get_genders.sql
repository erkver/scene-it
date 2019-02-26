SELECT round((SUM(CASE WHEN u.gender = 'Male' then 1 end)*100)
::numeric / count
(*), 0) AS male,
round
((SUM
(CASE WHEN u.gender = 'Female' then 1
end)*100)::numeric / count
(*), 0) AS female
FROM favorites f 
JOIN users u ON f.userId = u.user_id
WHERE movieId = $1;