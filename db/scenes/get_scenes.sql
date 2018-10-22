SELECT * FROM testScenes
WHERE reportId = $1
ORDER BY ts_id asc;