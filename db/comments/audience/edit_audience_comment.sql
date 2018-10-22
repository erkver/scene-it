UPDATE testAComment
SET gender = $2, age = $3, comment = $4
WHERE tAC_id = $1
RETURNING *;