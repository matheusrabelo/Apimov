#Apimov

[![npm version](https://badge.fury.io/js/apimov.svg)](https://badge.fury.io/js/apimov) [![Build Status](https://travis-ci.org/matheusrabelo/Apimov.svg?branch=master)](https://travis-ci.org/matheusrabelo/Apimov) [![Coverage Status](https://coveralls.io/repos/github/matheusrabelo/Apimov/badge.svg?branch=master)](https://coveralls.io/github/matheusrabelo/Apimov?branch=master)

##About

Node.js API Generator


## Installation

This library is distributed on **npm**. To install, run the following command:

``` sh
$ npm install apimov -g
```

##Usage

At this moment, you need to do manually:

```javascript
import apimov from "apimov";

const config = {
    "src": "../build",
    "resource": "Books",
    "database": "mysql",
    "properties": "",
    "middlewares": ["helmet", "morgan"],
    "routes": ["post", "delete", "get"]
};

const api = new apimov(config);

try{
    api.build();
}catch(e){
    console.log(e.message);
}
```

The generated API is on specified destination folder.

##Scripts
- Use **npm run start** to run nodemon
- Use **npm run test** to run tests
- Use **npm run coverage** to get test coverage

##Authors
- Matheus Freire Rabelo
- Leonardo Teixeira Menezes