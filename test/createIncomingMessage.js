import createIncomingMessage from "../lib/createIncomingMessage";

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

    const incomingMessag = createIncomingMessage(context);

    incomingMessag.resume();
    incomingMessag.socket.destroy();
    incomingMessag.url.should.eql("https://foo.com/bar");
    incomingMessag.connection.should.eql({
      encrypted     : true,
      remoteAddress : "192.168.0.1"
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

    const incomingMessag = createIncomingMessage(context);

    incomingMessag.resume();
    incomingMessag.socket.destroy();
    incomingMessag.url.should.eql("http://foo.com/bar");
    incomingMessag.connection.should.eql({
      encrypted     : false,
      remoteAddress : undefined
    });
  });

});
