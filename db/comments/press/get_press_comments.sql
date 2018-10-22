SELECT * FROM testPComment
WHERE reportId = $1
ORDER BY tpc_id asc;