INSERT INTO testPComment (name, outlet, reportId, comment)
VALUES($1, $2, $3, $4)
RETURNING *;