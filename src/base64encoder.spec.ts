import { Base64encoder } from "./base64encoder";

const createEncoder = () => {
  return new Base64encoder();
};

describe("Base64encode", () => {
  test("works with empty string", () => {
    const sut = createEncoder();

    expect(sut).toBeDefined();
    expect(sut.encode("")).toBe("");
  });

  describe("encode", () => {
    test.each([
      {
        input: "hat",
        expected: "aGF0",
      },
      {
        input: "Hello World",
        expected: "SGVsbG8gV29ybGQ=",
      },
      {
        input: "Hello World 🐸",
        expected: "SGVsbG8gV29ybGQg8J+QuA==",
      },
    ])("$input transformed into $expected", ({ input, expected }) => {
      const sut = createEncoder();
      const result = sut.encode(input);

      expect(result).toBe(expected);
    });
  });

  describe("decode", () => {
    test.each([
      {
        expected: "hat",
        input: "aGF0",
      },
      {
        expected: "Hello World",
        input: "SGVsbG8gV29ybGQ=",
      },
      {
        expected: "Hello World 🐸",
        input: "SGVsbG8gV29ybGQg8J+QuA==",
      },
    ])("$input transformed into $expected", ({ input, expected }) => {
      const sut = createEncoder();
      const result = sut.decode(input);

      expect(result).toBe(expected);
    });
  });
});
