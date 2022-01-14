import IncomingMessage from "../src/IncomingMessage";

describe("IncomingMessage", () => {

  it("Should work", () => {

    const context = {
      bindings : {
        req : {
          originalUrl : "https://foo.com/bar",
          headers     : { "x-forwarded-for": "192.168.0.1:57996" }
        }
      },
      log : () => {}
    };

    const req = new IncomingMessage(context);
    req.resume();
    req.socket.destroy();

    expect(req).toMatchObject({
      url         : "https://foo.com/bar",
      connection  : {
        encrypted     : true,
        remoteAddress : "192.168.0.1"
      }
    });
  });

  it("Should work with no headers", () => {

    const context = {
      bindings : {
        req : {
          originalUrl : "http://foo.com/bar"
        }
      },
      log : () => {}
    };

    const req = new IncomingMessage(context);
    req.resume();
    req.socket.destroy();

    expect(req).toMatchObject({
      url         : "http://foo.com/bar",
      connection  : {
        encrypted     : false,
        remoteAddress : undefined
      }
    });
  });

  it("Should work with a full native context object", () => {

    const context = {
      invocationId : "f0f6e586-0b79-4407-aa53-97919f45eba5",
      bindingData : { foo: "bar" },
      bindings : {
        req : {
          originalUrl : "http://foo.com/bar"
        }
      },
      log   : () => {},
      done  : () => {}
    };

    const req = new IncomingMessage(context);
    req.resume();
    req.socket.destroy();

    expect(req).toMatchObject({
      url         : "http://foo.com/bar",
      connection  : {
        encrypted     : false,
        remoteAddress : undefined
      }
    });

    expect(req.context).toBeDefined();
    expect(req.context).not.toBe(context);
    expect(req.context.invocationId).toBe(context.invocationId);
    expect(req.context.bindingData).toBe(context.bindingData);
    expect(req.context.bindings).toBe(context.bindings);
    expect(req.context.log).toBe(context.log);
    expect(req.context.log).toBeInstanceOf(Function);
    expect(req.context.done).toBeUndefined(); // We don't want to pass done

  });

});
