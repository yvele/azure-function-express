# azure-function-express

<img align="right" alt="Function logo" src="media/function.png" title="Function" width="150"/>

> Allows Express usage with Azure Function

[![npm version](https://img.shields.io/npm/v/azure-function-express.svg)](https://www.npmjs.com/package/azure-function-express)
[![Travis Status](https://img.shields.io/travis/yvele/azure-function-express/master.svg?label=travis)](https://travis-ci.org/yvele/azure-function-express)
[![Coverage Status](https://img.shields.io/codecov/c/github/yvele/azure-function-express/master.svg)](https://codecov.io/github/yvele/azure-function-express)
[![MIT licensed](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

## Description

Connect your Express application to an [Azure Function handler](https://github.com/Azure/azure-webjobs-sdk-script/wiki/Http-Functions), and make seamless usage of [all middlewares](http://expressjs.com/en/guide/using-middleware.html) you are already familiar with.

## Usage

In your `index.js`:

```js
const createAzureFunctionHandler = require("azure-function-express").createAzureFunctionHandler;
const express = require("express");

// Create express app as usual
const app = express();
app.get("/api/:foo/:bar", (req, res) => {
  res.json({
    foo  : req.params.foo,
    bar  : req.params.bar
  });
});

// Binds the express app to an Azure Function handler
module.exports = createAzureFunctionHandler(app);
```

Make you you are binding `req` and `res` in your `function.json`:

```json
{
  "bindings": [{
    "authLevel" : "anonymous",
    "type"      : "httpTrigger",
    "direction" : "in",
    "name"      : "req",
    "route"     : "foo/{bar}/{id}"
  }, {
    "type"      : "http",
    "direction" : "out",
    "name"      : "res"
  }]
}
```

You can have a single `function.json` that matches all HTTP routes with binding `"route": "{*segments}"`.
And let Express handles routing.

All examples [here](/examples/).

## License

[Apache 2.0](LICENSE) © Yves Merlicco
