import { createAzureFunctionHandler } from "../lib";

const NOOP = () => {};

describe("createAzureFunctionHandler", () => {

  it("Should work", () => {
    createAzureFunctionHandler(NOOP).should.be.Function();
  });

});
