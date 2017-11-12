CREATE TABLE IF NOT EXISTS invoices (
	"id" SERIAL PRIMARY KEY,
    "document" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255),
    "amount" DECIMAL(16,2) NOT NULL
);
