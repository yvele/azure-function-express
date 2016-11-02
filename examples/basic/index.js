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
