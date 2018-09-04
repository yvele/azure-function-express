<a href="https://hapticmedia.fr/en/">
  <img align="right" alt="Supported by Hapticmedia" src="docs/media/hapticmedia-support.svg" title="Supported by Hapticmedia" height="60"/>
</a>


# azure-function-express

<a href="https://azure.microsoft.com/en-us/services/functions/">
  <img align="right" alt="Function logo" src="docs/media/function.png" title="Function" width="150"/>
</a>

> Allows Express usage with Azure Function

[![npm version](https://img.shields.io/npm/v/azure-function-express.svg)](https://www.npmjs.com/package/azure-function-express)
[![Node](https://img.shields.io/badge/node-v6-blue.svg)](https://github.com/Azure/azure-webjobs-sdk-script/issues/2036#issuecomment-336942961)
![Node](https://img.shields.io/badge/node-v8-blue.svg)
![Node](https://img.shields.io/badge/node-v10-blue.svg)
[![Travis Status](https://img.shields.io/travis/yvele/azure-function-express/master.svg?label=travis)](https://travis-ci.org/yvele/azure-function-express)
[![Coverage Status](https://img.shields.io/codecov/c/github/yvele/azure-function-express/master.svg)](https://codecov.io/github/yvele/azure-function-express)
[![MIT licensed](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)


## Description

[Connect](https://github.com/senchalabs/connect) your [Express](https://expressjs.com) application to an [Azure Function handler](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node), and make seamless usage of [all middlewares](http://expressjs.com/en/guide/using-middleware.html) you are already familiar with.


## Usage

In your `index.js`:

```js
const createHandler = require("azure-function-express").createHandler;
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
module.exports = createHandler(app);
```

Make sure you are binding `req` and `res` in your `function.json`:

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

To allow Express handles all HTTP routes itself you may set a glob star route in a single root `function.json`:

```json
{
  "bindings": [{
    "authLevel" : "anonymous",
    "type"      : "httpTrigger",
    "direction" : "in",
    "name"      : "req",
    "route"     : "{*segments}"
  }, {
    "type"      : "http",
    "direction" : "out",
    "name"      : "res"
  }]
}
```

Note that `segments` is not used and could be anything. See [Azure Function documentation](https://github.com/Azure/azure-webjobs-sdk-script/wiki/Http-Functions).

All examples [here](/examples/).


## Context

All native Azure Functions [context](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#context-object) properties, except `done`, are exposed through `req.context`.

As en example, you can [log](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node#writing-trace-output-to-the-console) using:

```js
app.get("/api/hello-world", (req, res) => {
  req.context.log({ hello: "world" });
  ...
});
```


## Runtime compatibility

Supported Node version are:
 - Node 6.11.2 ([first node version supported by Azure Functions](https://github.com/Azure/azure-webjobs-sdk-script/issues/2036#issuecomment-336942961))
 - Node 8 (LTS)
 - Node 10

Azure Functions runtime v1 and v2 beta are both supported.


## License

[Apache 2.0](LICENSE) © Yves Merlicco
