UPDATE testScenes
SET scene = $2, reportId = $3
WHERE tS_id = $1
RETURNING *;