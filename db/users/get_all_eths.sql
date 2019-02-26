SELECT ROUND((SUM(CASE WHEN u.race LIKE '%Asian%' THEN 1 END)*100)
::NUMERIC / COUNT
(*), 0) AS eth_one,
ROUND
((SUM
(CASE WHEN u.race LIKE '%Hispanic%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS eth_two,
ROUND
((SUM
(CASE WHEN u.race LIKE '%African%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS eth_three,
ROUND
((SUM
(CASE WHEN u.race LIKE '%Caucasian%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS eth_four,
ROUND
((SUM
(CASE WHEN u.race LIKE '%Native%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS eth_five,
ROUND
((SUM
(CASE WHEN u.race LIKE '%Middle Eastern%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS eth_six,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%Asian%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_eth_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%Hispanic%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_eth_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%African%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_eth_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%Caucasian%' then 1
end)*100)::numeric / count
(*), 0) AS m_eth_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%Native%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_eth_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Male' AND u.race LIKE '%Middle Eastern%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS m_eth_six,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%Asian%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_one,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%Hispanic%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_two,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%African%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_three,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%Caucasian%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_four,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%Native%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_five,
ROUND
((SUM
(CASE WHEN u.gender = 'Female' AND u.race LIKE '%Middle Eastern%' THEN 1
END)*100)::NUMERIC / COUNT
(*), 0) AS f_eth_six
FROM favorites f 
JOIN users u ON f.userId = u.user_id
WHERE movieId = 78;