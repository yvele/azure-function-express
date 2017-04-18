import createIncomingMessage from "../src/createIncomingMessage";

describe("createIncomingMessage", () => {

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

    const incomingMessage = createIncomingMessage(context);
    incomingMessage.resume();
    incomingMessage.socket.destroy();

    expect(incomingMessage).toMatchObject({
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

    const incomingMessage = createIncomingMessage(context);
    incomingMessage.resume();
    incomingMessage.socket.destroy();

    expect(incomingMessage).toMatchObject({
      url         : "http://foo.com/bar",
      connection  : {
        encrypted     : false,
        remoteAddress : undefined
      }
    });
  });

});
