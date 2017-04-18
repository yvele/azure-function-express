import { createAzureFunctionHandler } from "../src";

const NOOP = () => {};

describe("createAzureFunctionHandler", () => {

  it("Should work", () => {
    expect(createAzureFunctionHandler(NOOP)).toBeInstanceOf(Function);
  });

});
