SELECT
    "id",
    "document",
    "description",
    "amount"::float
FROM invoices
WHERE id = $1;
