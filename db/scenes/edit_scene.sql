UPDATE testScenes
SET scene = $2
WHERE tS_id = $1
RETURNING *;