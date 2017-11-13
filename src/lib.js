const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const path = require('path');
const process = require('process');
const fs = require('fs');

const app = express();
let pool;

const mountParams = (reqParams, reqQueryString, reqBody) => {
    const params = Object.values(reqParams);
    const queryString = Object.values(reqQueryString);
    const body = Object.values(reqBody);
    const queryParams =
        [].concat(params, queryString, body);
    return queryParams;
};

const handler = (query) => (req, res) => {
    const params = mountParams(req.params, req.query, req.body);
    return pool.connect()
        .then((client) => client.query(query, params))
        .then((data) => res.status(200).json(data.rows))
        .catch((err) => res.status(500).json(err));
};

const registerRoute = (route) => {
    const method = route.method.toLowerCase();
    const queryPath = path.join(process.cwd(), route.query);
    const query = fs.readFileSync(queryPath).toString();
    app[method](route.path, handler(query));
};

const checkPooling = () => {
    return pool.connect()
        .then((client) => client.query('SELECT NOW();'))
        .then((data) => (data.rows))
        .then(([row]) => console.log(`Connected with db in ${row.now}`))
        .catch((err) => console.log('Failed to connect with db'));
};

const run = (api, appPort) => {
    const port = appPort || process.env.PORT || 8080;
    app.use(bodyParser.json());
    app.use(morgan('tiny'));
    pool = new pg.Pool(api.config);
    api.routes.forEach(registerRoute);
    app.use('*', (req, res) => res.status(404).json());
    checkPooling()
        .then(() =>
            app.listen(port, () => console.log(`Listening on ${port}`)));
};

module.exports = {
    mountParams, handler, run, pool, registerRoute,
};
