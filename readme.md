#Apimov

[![Build Status](https://travis-ci.org/matheusrabelo/Apimov.svg?branch=master)](https://travis-ci.org/matheusrabelo/Apimov) [![Coverage Status](https://coveralls.io/repos/github/matheusrabelo/Apimov/badge.svg?branch=master)](https://coveralls.io/github/matheusrabelo/Apimov?branch=master)

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
    "src": "test/build/",
    "resource": "Books",
    "properties": "",
    "middlewares": ["helmet", "morgan"],
    "routes": ["post", "get"]
};

const api = new apimov(config);

try{
    api.build();
}catch(e){
    console.log(e.message);
}
```

The generated API it's on api object.

##Scripts
- Use **npm start** to run nodemon
- Use **npm test** to run tests
- Use **npm coverage** to get test coverage

##Authors
- Matheus Freire Rabelo
- Leonardo Teixeira Menezes