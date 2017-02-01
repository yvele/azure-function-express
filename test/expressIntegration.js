import should from "should";
import express from "express";
import { createAzureFunctionHandler } from "../lib";

describe("express integration", () => {

  it("should work with x-powered-by", done => {

    // 1. Create express app
    const app = express();

    app.get("/api/:foo/:bar", (req, res) => {
      res.set("Cache-Control", "max-age=600");
      res.json({ foo: req.params.foo, bar: req.params.bar });
    });

    // 2. Create handle
    const handle = createAzureFunctionHandler(app);

    // 3. Mock Azure Function context
    var context = {
      bindings  : { req: { method: "GET", originalUrl: "https://lol.com/api/foo/bar" } },
      log       : () => { throw new Error("Log should not be called"); },
      done : (error) => {
        should(error).be.undefined();
        context.res.status.should.equal(200);
        context.res.body.should.equal('{"foo":"foo","bar":"bar"}');
        context.res.headers.should.eql({
          "X-Powered-By"    : "Express",
          "Cache-Control"   : "max-age=600",
          "Content-Type"    : "application/json; charset=utf-8",
          "Content-Length"  : "25",
          ETag              : 'W/"19-uqSr25XbqZ0ZRt+xWzwc6A"'
        });

        done();
      }
    };

    // 4. Call the handle with the mockup
    handle(context, context.req);
  });

  it("should work without x-powered-by", done => {

    // 1. Create express app
    const app = express();
    app.disable("x-powered-by");

    app.get("/api/:foo/:bar", (req, res) => {
      res.json({ foo: req.params.foo, bar: req.params.bar });
    });

    // 2. Create handle
    const handle = createAzureFunctionHandler(app);

    // 3. Mock Azure Function context
    var context = {
      bindings  : { req: { method: "GET", originalUrl: "https://lol.com/api/foo/bar" } },
      log       : () => { throw new Error("Log should not be called"); },
      done : (error) => {
        should(error).be.undefined();
        context.res.status.should.equal(200);
        context.res.body.should.equal('{"foo":"foo","bar":"bar"}');
        context.res.headers.should.eql({
          "Content-Type"    : "application/json; charset=utf-8",
          "Content-Length"  : "25",
          ETag              : 'W/"19-uqSr25XbqZ0ZRt+xWzwc6A"'
        });

        done();
      }
    };

    // 4. Call the handle with the mockup
    handle(context, context.req);
  });

});
