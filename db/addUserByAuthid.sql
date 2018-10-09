INSERT INTO users (name, authid, email, picture, gender)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;