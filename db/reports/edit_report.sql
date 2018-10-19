UPDATE testReport
SET attendance = $2, ratio = $3, reaction = $4, movieId = $5
WHERE tR_id = $1;