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

});
