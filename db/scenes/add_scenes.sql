INSERT INTO testScenes
  (scene, reportId)
VALUES($1, $2);
SELECT *
FROM testScenes
WHERE reportId = $2
ORDER BY ts_id asc;
