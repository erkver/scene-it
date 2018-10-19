UPDATE testPComment
SET name = $2, outlet = $3, reportId = $4, comment = $5
WHERE tPC_id = $1
RETURNING *;