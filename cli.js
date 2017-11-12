#!/usr/bin/env node

const process = require('process');
const path = require('path');
const apimov = require('./src/lib');

const dirname = process.cwd();
const apimovFile = path.join(dirname, 'apimov.json');

const line = '-------------------------------------------------';

const run = (api) => {
    console.log('Open-source on GitHub');
    console.log('Powered by @matheusrabelo and @ltmenezes');
    console.log('Contributions, stars and feedbacks are welcome');
    console.log(line);
    console.log('Running with the entry file ' + apimovFile);
    apimov.run(api);
};

const fail = (err) => {
    console.log('Something went wrong while reading file:');
    console.log(apimovFile);
    console.log('The error is: ' + err.message);
    console.log('Check if apimov.json exists and if is valid');
};

console.log(line);
console.log('Initiliazing Apimov CLI stable');
console.log(line);

try {
    const api = require(apimovFile);
    run(api);
} catch (e) {
    fail(e);
}
