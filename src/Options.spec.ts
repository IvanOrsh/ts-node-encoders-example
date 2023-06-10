import { Options } from "./Options";
import { DEFAULT_ENCODER, encoders } from "./encoders";
import type { EncodersType } from "./Options";

const processExit = jest
  .spyOn(process, "exit")
  .mockImplementation((code?: number) => undefined as never);

const consoleError = jest
  .spyOn(console, "error")
  .mockImplementation((message: string) => message);

const TEST_INPUT = "testing";

describe("Options", () => {
  afterEach(() => {
    consoleError.mockClear();
    processExit.mockClear();
  });

  test("defined", () => {
    expect(Options).toBeDefined();
  });

  test("exits if encoding argument is not passed", () => {
    new Options(undefined, { decode: false, encoding: DEFAULT_ENCODER });
    expect(processExit).toBeCalledWith(1);
    expect(consoleError).toBeCalledWith(
      "Please pass an input string to encode"
    );
  });

  test("exits if wrong encoding is passed", () => {
    new Options(TEST_INPUT, { decode: false, encoding: "wrong encoding" });
    expect(processExit).toBeCalledWith(1);
    expect(consoleError).toBeCalledWith(
      "wrong encoding is not a valid value. Valid: base64, url"
    );
  });

  test("should expose input", () => {
    expect(
      new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false })
        .input
    ).toBe(TEST_INPUT);
  });

  test("should expose encoding", () => {
    expect(
      new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false })
        .encoding
    ).toBe(DEFAULT_ENCODER);
  });

  test("should expose decode", () => {
    expect(
      new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false })
        .decode
    ).toBe(false);
    expect(
      new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: true })
        .decode
    ).toBe(true);
  });

  for (const encoding in encoders) {
    test(`should use appropriate encoder for ${encoding}`, () => {
      const opts = new Options(TEST_INPUT, { encoding, decode: false });

      expect(opts.encoding).toBe(encoding);
      expect(opts.encoder).toBe(encoders[encoding as EncodersType]);
    });
  }
});
