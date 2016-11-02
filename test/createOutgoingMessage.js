import should from "should";
import rewire from "rewire";
const createOutgoingMessage = rewire("../lib/createOutgoingMessage");

describe("createOutgoingMessage", () => {

  describe("writeHead", () => {
    const writeHead = createOutgoingMessage.__get__("writeHead");

    it("Should throws with an invalid status code", () => {
      should.throws(() => {
        writeHead(null, 1);
      }, /^RangeError: Invalid status code: 1/);
    });

    it("Should handle unknown status codes", () => {
      const context = { res: {} };
      const outgoingMessage = {};
      Reflect.apply(writeHead, outgoingMessage, [context, 998]);
      outgoingMessage.statusMessage.should.eql("unknown");
      context.res.status.should.eql(998);
    });

    it("Should work with headers", () => {
      const context = { res: {} };
      Reflect.apply(writeHead, {}, [context, 200, null, { foo: "bar" }]);
      context.res.status.should.eql(200);
      context.res.headers.should.eql({ foo: "bar" });
    });

    it("Should work with headers with previous headers", () => {
      const context = { res: {} };
      const outgoingMessage = {
        _headers        : { previous: "previous" },
        setHeader       : (key, value) => {
          outgoingMessage._headers[key] = value;
        },
        _renderHeaders  : () => outgoingMessage._headers
      };
      Reflect.apply(writeHead, outgoingMessage, [context, 200, null, { foo: "bar" }]);
      context.res.status.should.eql(200);
      context.res.headers.should.eql({ foo: "bar", previous: "previous" });
    });

  });

});
