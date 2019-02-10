INSERT INTO testAComment (gender, age, comment, reportId)
VALUES ($1, $2, $3, $4);
RETURNING *;