import createIncomingMessage from "../lib/createIncomingMessage";

describe("createIncomingMessage", () => {

  it("Should work", () => {

    const context = {
      bindings : { req: { originalUrl: "http://foo.com/bar" } },
      log      : () => {}
    };

    const incomingMessag = createIncomingMessage(context);

    incomingMessag.resume();
    incomingMessag.socket.destroy();
    incomingMessag.url.should.eql("http://foo.com/bar");
  });

});
