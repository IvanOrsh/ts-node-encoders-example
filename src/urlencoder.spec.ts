import { UrlEncoder } from "./urlencoder";

function createUrlEncoder() {
  return new UrlEncoder();
}

describe("UrlEncoder", () => {
  test("defined and works with empty string", () => {
    const sut = createUrlEncoder();

    expect(sut).toBeDefined();
    expect(sut.encode("")).toBe("");
  });

  describe("encode", () => {
    test.each([
      {
        input: "foo bar baz",
        expected: "foo%20bar%20baz",
      },
      {
        input: "babaganush",
        expected: "babaganush",
      },
      {
        input: "Hello World 🐸",
        expected: "Hello%20World%20%F0%9F%90%B8",
      },
    ])("$input transformed into $expected", ({ input, expected }) => {
      const sut = createUrlEncoder();
      const result = sut.encode(input);

      expect(result).toBe(expected);
    });
  });

  describe("decode", () => {
    test.each([
      {
        input: "foo%20bar%20baz",
        expected: "foo bar baz",
      },
      {
        input: "babaganush",
        expected: "babaganush",
      },
      {
        input: "Hello%20World%20%F0%9F%90%B8",
        expected: "Hello World 🐸",
      },
    ])("$input transformed into $expected", ({ input, expected }) => {
      const sut = createUrlEncoder();
      const result = sut.decode(input);

      expect(result).toBe(expected);
    });
  });
});
