INSERT INTO invoices (
    "document",
    "description",
    "amount"
)
VALUES (
    $1, $2, $3
)
RETURNING ("id");
