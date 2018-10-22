UPDATE testPComment
SET name = $2, outlet = $3, comment = $4
WHERE tPC_id = $1
RETURNING *;