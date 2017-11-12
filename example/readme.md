# Example

## About
This is a simple example of how to use Apimov to generate internal API's

## Usage
Please set the config property in **apimov.json**.
The easiest way to do this is creating an account on:
```
https://www.elephantsql.com/
```
and fill the fields.

Finally, run the following command:
```
$ npm install -g apimov
$ apimov
```

## Avaiable requests
Create table invoices (GET /actions/create-invoices)
```
$ curl -i http://localhost:8080/actions/create-invoices
```

Drop table invoices (GET /actions/drop-invoices)
```
$ curl -i http://localhost:8080/actions/drop-invoices
```

Get all invoices (GET /invoices)
```
$ curl -i http://localhost:8080/invoices
```

Get invoice given id (GET /invoices/:id)
```
$ curl -i http://localhost:8080/invoices/2
```

Create invoice (POST /invoices)
```
$ curl -d '{"document": "document info", "description": "some description", "amount": 1234.456}' -H "Content-Type: application/json" -X POST http://localhost:8080/invoices
```
