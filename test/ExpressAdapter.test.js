import { ExpressAdapter } from "../src";

const NOOP = () => {};

describe("ExpressAdapter", () => {

  it("Should work", done => {

    let listenerCalled = false;

    const adapter = new ExpressAdapter((req, res) => {
      listenerCalled = true;
      expect(req.url).toBe("http://foo.com/bar");
      res.statusCode = 200;
      res.end("body", "utf8");
    });

    const context = {
      log       : NOOP,
      bindings  : { req: { originalUrl: "http://foo.com/bar" } },
      done      : () => {
        expect(listenerCalled).toBe(true);

        // Response that will be sent to Azure Function runtime
        expect(context.res).toEqual({
          body    : "body",
          headers : {},
          isRaw   : true,
          status  : 200
        });
        done();
      }
    };

    const handler = adapter.createAzureFunctionHandler();
    handler(context);
  });

  it("Should work with a buffer", done => {

    let listenerCalled = false;

    const adapter = new ExpressAdapter((req, res) => {
      listenerCalled = true;
      expect(req.url).toBe("http://foo.com/bar");
      res.statusCode = 200;
      res.end(Buffer.from("body", "utf8"), "utf8");
    });

    const context = {
      log       : NOOP,
      bindings  : { req: { originalUrl: "http://foo.com/bar" } },
      done      : () => {
        expect(listenerCalled).toBe(true);

        // Response that will be sent to Azure Function runtime
        expect(context.res).toEqual({
          body    : "body",
          headers : {},
          isRaw   : true,
          status  : 200
        });
        done();
      }
    };

    const handler = adapter.createAzureFunctionHandler();
    handler(context);
  });

  describe("handleAzureFunctionRequest", () => {

    it("Should throws with no context", () => {
      const adapter = new ExpressAdapter();
      expect(() => {
        adapter.handleAzureFunctionRequest();
      }).toThrowError(/^context is null or undefined/);
    });

    it("Should throws with a context with no bindings", () => {
      const adapter = new ExpressAdapter();
      expect(() => {
        adapter.handleAzureFunctionRequest({});
      }).toThrowError(/^context.bindings is null or undefined/);
    });

    it("Should throws with a context with no req binding", () => {
      const adapter = new ExpressAdapter();
      expect(() => {
        adapter.handleAzureFunctionRequest({ bindings: {} });
      }).toThrowError(/^context.bindings.req is null or undefined/);
    });

    it("Should throws with a context with a req binding having no originalUrl", () => {
      const adapter = new ExpressAdapter();
      expect(() => {
        adapter.handleAzureFunctionRequest({ bindings: { req: {} } });
      }).toThrowError(/^context.bindings.req.originalUrl is null or undefined/);
    });

  });

});
