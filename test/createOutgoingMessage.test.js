import createOutgoingMessage from "../src/createOutgoingMessage";

describe("createOutgoingMessage", () => {

  describe("writeHead", () => {

    it("Should throws with an invalid status code", () => {
      const outgoingMessage = createOutgoingMessage();
      expect(() => {
        outgoingMessage.writeHead(1);
      }).toThrow(/^Invalid status code: 1/);
    });

    it("Should handle unknown status codes", () => {
      const context = { res: {} };
      const outgoingMessage = createOutgoingMessage(context);

      outgoingMessage.writeHead(998);

      expect(outgoingMessage.statusMessage).toBe("unknown");
      expect(context.res.status).toBe(998);
    });

    it("Should work with headers", () => {
      const context = { res: {} };
      const outgoingMessage = createOutgoingMessage(context);

      outgoingMessage.writeHead(200, null, { foo: "bar" });

      expect(outgoingMessage.statusMessage).toBe("OK");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar" });
    });

    it("Should work with headers with previous headers", () => {
      const context = { res: {} };
      const outgoingMessage = createOutgoingMessage(context);
      outgoingMessage._headers = { previous: "previous" };
      outgoingMessage.setHeader = (key, value) => { outgoingMessage._headers[key] = value };
      outgoingMessage._renderHeaders = () => outgoingMessage._headers;

      outgoingMessage.writeHead(200, null, { foo: "bar" });

      expect(outgoingMessage.statusMessage).toBe("OK");
      expect(context.res.status).toBe(200);
      expect(context.res.headers).toEqual({ foo: "bar", previous: "previous" });
    });

  });

});
