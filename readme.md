# Apimov
[![npm version](https://badge.fury.io/js/apimov.svg)](https://badge.fury.io/js/apimov) 

Ultra lightweight library to generate internal APIs.

## About
From now, you can create an API just with SQL queries and a single json file.

## Usage
Create your own **apimov.json** with your API spec.

Run the following command:
```
$ npm install apimov -g
$ apimov
``` 

This command will find and mount an API via **apimov.json**

## Creating an apimov.json
The **apimov.json** has the following structure:
```
{
    "config": {
        "host": "localhost",
        "user": "admin",
        "database": "invoices-db",
        "port": 5432,
        ...
    },
    "routes": [
        {
            "path": "/invoices/:invoiceId",
            "method": "GET",
            "query": "queries/get-invoice-by-id.sql"
        },
        {
            "path": "/invoices",
            "method": "GET",
            "query": "queries/get-invoices.sql"
        }
        ...
    ]
}
```

## Example
This repo has an example of usage, just with **queries/** folder and the **apimov.json**, you can start an API by running the **Apimov CLI**.
Fork/clone this repo and try to do this on **example/** folder.

## Relevant infos
1. All queries are executed on PostgreSQL.
If you are getting started with it, you can try:
```
https://www.postgresql.org/download/
https://www.pgadmin.org/
or just
https://www.elephantsql.com/
```

2. The driver used is [**pg**](https://node-postgres.com/).
Configurations and queries contracts are the same avaiable on it.

3. Apimov unrolls and concats params, query strings and body (in this order) before querying. Don't forget that your queries should to consider it. The apimov source code is:
```
...
const body = Object.values(reqBody);
const queryParams =
        [].concat(params, queryString, body);
```

## Contribute
Contributions, stars and feedbacks are always welcome

## Authors
- Leonardo Teixeira Menezes
- Matheus Freire Rabelo
