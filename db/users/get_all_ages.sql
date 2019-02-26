SELECT ROUND((SUM(CASE WHEN u.age <= 24 THEN 1 END)*100)
::NUMERIC / COUNT
(*), 0) AS age_one,
ROUND
((SUM
(CASE WHEN u.age > 24 AND u.age <= 35 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS age_two,
ROUND
((SUM
(CASE WHEN u.age > 35 AND u.age <= 45 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS age_three,
ROUND
((SUM
(CASE WHEN u.age > 45 AND u.age <= 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS age_four,
ROUND
((SUM
(CASE WHEN u.age > 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS age_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.age <= 24 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_age_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.age > 24 AND u.age <= 35 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_age_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.age > 35 AND u.age <= 45 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_age_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.age > 45 AND u.age <= 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_age_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.age > 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_age_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.age <= 24 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_age_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.age > 24 AND u.age <= 35 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_age_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.age > 35 AND u.age <= 45 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_age_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.age > 45 AND u.age <= 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_age_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.age > 55 THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_age_five
FROM favorites f 
JOIN users u ON f.userId = u.user_id
WHERE movieId = 78;