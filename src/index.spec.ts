import { fromArgv } from "./OptionsParser";

describe("Encoder", () => {
  test("can be loaded", () => {
    expect(fromArgv).toBeDefined();
  });
});
