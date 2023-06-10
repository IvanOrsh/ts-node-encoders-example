import { fromArgv } from "./fromArgv";

import { DEFAULT_ENCODER, encoders } from "./encoders";

const TEST_INPUT = "Sufficiently complicated phrase!";

describe("fromArgv", () => {
  test("can be loaded", () => {
    expect(fromArgv).toBeDefined();
  });

  test("can pass input to Options", () => {
    expect(fromArgv([TEST_INPUT]).input).toBe(TEST_INPUT);
  });

  test("defaults decode option to false", () => {
    expect(fromArgv([TEST_INPUT]).decode).toBeFalsy();
  });

  test("defaults to correct encoding type", () => {
    expect(fromArgv([TEST_INPUT]).encoding).toBe(DEFAULT_ENCODER);
  });

  test("can pass a decode boolean to Options", () => {
    expect(fromArgv([TEST_INPUT, "-d"]).decode).toBeTruthy();
    expect(fromArgv([TEST_INPUT, "--decode"]).decode).toBeTruthy();
  });

  for (const encoding in encoders) {
    test(`can set ${encoding} encoding`, () => {
      expect(fromArgv([TEST_INPUT, "-e", encoding]).encoding).toBe(encoding);
      expect(fromArgv([TEST_INPUT, "--encoding", encoding]).encoding).toBe(
        encoding
      );
    });
  }
});
