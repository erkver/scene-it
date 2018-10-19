INSERT INTO testScenes(scene, reportId)
VALUES($1, $2)
RETURNING *;
