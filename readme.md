# Apimov

[![npm version](https://badge.fury.io/js/apimov.svg)](https://badge.fury.io/js/apimov) [![Build Status](https://travis-ci.org/matheusrabelo/Apimov.svg?branch=master)](https://travis-ci.org/matheusrabelo/Apimov) [![Coverage Status](https://coveralls.io/repos/github/matheusrabelo/Apimov/badge.svg?branch=master)](https://coveralls.io/github/matheusrabelo/Apimov?branch=master)

## About

A minimalist, extensible Node.js REST API Generator. <br />
Apimov creates fully tested node servers. You specify the desired middleware's, data elements, database and Apimov creates the server on your behalf. <br />
Less time coding, more time doing what you love.  


## Installation

This library is distributed on **npm**. To install, run the following command:

``` sh
$ npm install apimov -g
```

## Usage

At this moment, you need to do manually:

```javascript
nodemon program.js init --exec babel-node
```

The generated API is on specified destination folder.

## Contribute
You can collaborate with Apimov by creating a fork and submitting a pull request.

All Apimov server's are built using our template system. You can create your own templates to use locally or to submit to the community by sending a PR to us.

## Scripts
- Use **npm run start** to run nodemon
- Use **npm run test** to run tests
- Use **npm run coverage** to get test coverage

## Authors
- Leonardo Teixeira Menezes
- Matheus Freire Rabelo
