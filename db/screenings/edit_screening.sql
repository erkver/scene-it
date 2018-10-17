UPDATE movies
SET screening_date = $2, theatreId = $3, seat_count = $4
WHERE id = $1
RETURNING *;