SELECT ROUND((SUM(CASE WHEN u.fav_genre LIKE '%Action%' THEN 1 END)*100)
::NUMERIC / COUNT
(*), 0) AS genre_one,
ROUND
((SUM
(CASE WHEN u.fav_genre LIKE '%Comedy%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS genre_two,
ROUND
((SUM
(CASE WHEN u.fav_genre LIKE '%Drama%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS genre_three,
ROUND
((SUM
(CASE WHEN u.fav_genre LIKE '%Sci-Fi%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS genre_four,
ROUND
((SUM
(CASE WHEN u.fav_genre LIKE '%Romance%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS genre_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.fav_genre LIKE '%Action%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_genre_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.fav_genre LIKE '%Comedy%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_genre_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.fav_genre LIKE '%Drama%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_genre_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.fav_genre LIKE '%Sci-Fi%' then 1
end)*100)::numeric / count
(*), 0) AS m_genre_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.fav_genre LIKE '%Romance%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_genre_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.fav_genre LIKE '%Action%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_genre_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.fav_genre LIKE '%Comedy%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_genre_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.fav_genre LIKE '%Drama%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_genre_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.fav_genre LIKE '%Sci-Fi%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_genre_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.fav_genre LIKE '%Romance%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_genre_five
FROM favorites f 
JOIN users u ON f.userId = u.user_id
WHERE movieId = 78;