SELECT *
FROM testAComments
WHERE reportId = $1
ORDER BY tAC_id asc;