import { createAzureFunctionHandler, createHandler } from "../src";

const NOOP = () => {};

describe("main", () => {

  it("createAzureFunctionHandler should work", () => {
    expect(createAzureFunctionHandler(NOOP)).toBeInstanceOf(Function);
  });

  it("createHandler should work", () => {
    expect(createHandler(NOOP)).toBeInstanceOf(Function);
  });

});
