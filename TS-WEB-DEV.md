- [1. Why Typescript?](#1-why-typescript)
  - [1.1 A Brief History of JavaScript](#11-a-brief-history-of-javascript)
  - [1.2 Understanding JavaScript Types (some recap)](#12-understanding-javascript-types-some-recap)
  - [1.3 Advantages and Disadvantages of JavaScript](#13-advantages-and-disadvantages-of-javascript)
  - [1.4 Why Typescript](#14-why-typescript)
- [2. Example - Encoders project](#2-example---encoders-project)
  - [2.1 Binary Math Refresher](#21-binary-math-refresher)
  - [2.2 Base64 Encoding](#22-base64-encoding)
  - [2.3 `base64encoder`](#23-base64encoder)
  - [2.4 Implementing Multiple Encoders](#24-implementing-multiple-encoders)
  - [2.5 Adding Support for Unicode Using Node.js](#25-adding-support-for-unicode-using-nodejs)
  - [2.6 Adding Another Encoder Implementation](#26-adding-another-encoder-implementation)
  - [2.7 Choosing the Right Encoder with Options](#27-choosing-the-right-encoder-with-options)
  - [2.8 Refactor for testing](#28-refactor-for-testing)
  - [2.9 Applying SOLID Principles](#29-applying-solid-principles)

# 1. Why Typescript?

## 1.1 A Brief History of JavaScript

**The Motivations**:

- The web needed a "glue language"
- Netscape wanted to compete for users with Microsoft
- Netscape included Java and wanted a complementary scripting language
- Designed to accommodate the constraints of the web and be malleable
- **Designed to be used by amateurs and advanced users alike**

## 1.2 Understanding JavaScript Types (some recap)

**Numbers**

- 64-bit floating point precision
- no "integer" type
- after a certain point, integers are "unsafe" and are approximated floating point
- Special values: `Infinity`, `-Infinity`, and `NaN`

---

**Booleans**

- Booleans can have a value of `true` or `false`
- In comparisons, equality can use `==` (coerced) or `===` (exact)

---

**Strings**

- Immutable
- Concatenate using `+`

---

**Undefined**

- Used to represent a variable that has not been assigned a value
- Does not imply a value of nothing (that would be `null`)

---

**Null**

- A value of nothing (but it is a value)
- Not the same as `undefined`

---

**Symbol**

- Unique and immutable
- Used as object property keys

---

**BigInt**

- BigInt is a numeric primitive type introduced in JavaScript to represent integers with arbitrary precision. It allows you to work with integers beyond the limits of the Number type.

```js
const bigNum1 = 1234567890123456789012345678901234567890n; // Using a BigInt literal
const bigNum2 = BigInt(9876543210987654321098765432109876543210); // Using the BigInt() function

console.log(bigNum1); // Output: 1234567890123456789012345678901234567890n
console.log(bigNum2); // Output: 9876543210987654321098765432109876543210n
```

```js
const bigNum1 = 1234567890n;
const bigNum2 = BigInt("9876543210");

const sum = bigNum1 + bigNum2;
console.log(sum); // Output: 11111111100n
```

- **BigInt values cannot be mixed directly with Number values in arithmetic operations**. You need to explicitly convert one type to the other before performing calculations.

---

**Functions and Object**

- Functions are first-class citizens
- Anything that is not one of the primitive values is an Object. (everything above)

---

**Understanding Type Conversion**

- Also called "type coercion"
- JS is a dynamic language with "loose typing"
- JS "coerces" types into other types if you if you it to

- When an operation involves an object and a primitive value, JavaScript follows the steps of the type coercion algorithm mentioned earlier (not really), but it also checks if the object has a [Symbol.toPrimitive] method. If the method exists, JavaScript invokes it to perform the coercion.

```js
const customObject = {
  value: 42,
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.value; // Return the value property as a number
    }
    if (hint === "string" || hint === "default") {
      return `Custom Object with value ${this.value}`; // Return a string representation of the object
    }
    throw new TypeError("Conversion not supported");
  },
};

console.log(Number(customObject)); // Output: 42 (Coerces the object to a number)
console.log(String(customObject)); // Output: "Custom Object with value 42" (Coerces the object to a string)
console.log(customObject + 10); // Output: "Custom Object with value 4210" (Coerces the object to a string and performs concatenation)
```

- It's important to note that the [Symbol.toPrimitive] method takes precedence over the valueOf() and toString() methods when performing type coercion on an object.

## 1.3 Advantages and Disadvantages of JavaScript

**Dynamic Typing (Loosely Typed)**

- Assign variables any type and JavaScript won't complain.
- Very useful for creating dynamic objects and parameters.
- Not as useful for scenarios relying on types never changing.

---

**Variable Scoping** - lol

- Until ES2015, JS did not have "block" scoping for variables.
- This contributed in the "global scope pollution" issue which lead to the IIFE pattern to create a contained scope.
- In ES2015, the `let` keyword was introduced allowing bock scoping.
- Since `let` is an ES2015 feature, to support older engines a transpiler like Babel.js must be introduced to make backward-compatible.

---

**Functions**

- Functions are first-class citizens in JS.
- This allows great flexibility for advanced usage.
- The `this` keyword is an easy stumbling block for most developers.
- To combat this, the "arrow" function was introduced in ES2015.

---

**Prototypes**

- To create "class-like" objects, JS has a prototype chain.
- Prototypal objects are memory efficient.
- Prototypes while powerful are a great source of confusion for developers.
- To support inheritance, it is not as intuitive as many other languages.
- Until ES2015, there was no "easy" way to declare classes using prototypes.

---

**Runtime**

- JS is interpreted language.
- Errors cannot be detected until runtime.
- Common error conditions or expressions can be caught when run through a "linting" process like ESLint.
- Coupled with the loosely-typed nature of JS, many errors will sometimes be found when specific code is run in the browser on and end-users machine.
- Robust unit testing is essential.
- UI-focused applications that depend on browser features, unit testing can only go far.

## 1.4 Why Typescript

**Static and Dynamic Typing**

- TypeScript introduces static typing but all typing is optional.
- This allows you to use the best of both dynamic and static typing.
- Static typing can prevent common errors like typos, type mismatching and so on.
- Many of the objects and functions can benefit from static typing.
- Provides hints on expectations to developers reading the code.

---

**Multitargeting**

- TypeScript is a compiled language so the compiler can target for us.
- TypeScript supports ES.... (2023)
- This allows us to achieve backwards compatibility without a 3rd party tool like Babel.js.
- As new versions of EcmaScript are released, TypeScript can re-target.

---

**Integrated Tooling**

- TypeScript is cross-platform and has first-class support in editors like VS Code.
- Intellisense is a powerful productivity booster and assists discovering APIs.
- TypeScript modules are accompanied by declaration files which double as API references.
- Refactor and rename support is supported.

---

**Future Readiness**

- TypeScript is designed to match language specifications for future EcmaScript versions.
- As JavaScript evolves, TypeScript can easily re-target your application to higher versions.
- Do not have to re-learn syntax across TypeScript and JavaScript.
- TypeScript will warn you when you use a language feature that isn't supported in your targeted ES version.

---

**When Not to Use Typescript**

- TS is designed for application-scale projects.
- TS exposes some advanced type features.
- Everyone working on a project must be comfortable.
- There will be a learning curve.

# 2. Example - Encoders project

## 2.1 Binary Math Refresher

**Understanding the Binary Math**

Base 10 Math:

- 1673 = 1 _ 10^3 + 6 _ 10^2 + 1 _ 10^1 + 3 _ 10^0

<br>

Binary Math

`+`

<-most significant least significant->

| 1 \* 2^10 | 1 \* 2^9 | 0 \* 2^8 | 1 \* 2^7 | 0 \* 2^6 | 0 \* 2^5 | 0 \* 2^4 | 1 \* 2^3 | 0 \* 2^2 | 0 \* 2^1 | 1 \* 2^0 |
| --------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- | -------- |
| 1024      | 512      | 0        | 128      | 0        | 0        | 0        | 1        | 0        | 0        | 1        |

0110_1000_1001

---

**Bit Shifting**

8-bits (1 byte) = 1111_1111 = 255 `0xFF`

"Shift" right (>>) 2

6-bits - 0011_1111 = 63 `0x3F`

"Shift" left (<<) 2

1111_1100 = 252

---

**Bitwise AND** (`&`)

- Using `AND` allows you to easily zero out bits for obtaining least or most significant bits only.

example:

0000_0101 `&` 0000_0011 = 0000_0001 (5 `&` 3 = 1)

---

**Bitwise OR** (`|`)

- Using `OR` allows you to easily combine two shifted number together

example:

0000_0101 `|` 0011_1000 = 0011_1101 (5 `|` 56 = 61)

---

**Combine Operations**

6-bits = 0011_1111 = 63 (0x3F)

shift left (<<) 2

1111_1100 = 252

OR (`|`) 0000_0011

8-bits = 1111_11111 = 255 (0xFF)

## 2.2 Base64 Encoding

- Prevent data corruption when using 8-bit data by using a limited character set.
- Take a sequence of characters (1 character = 1 byte = 8 bits)
  - A-Z, a-z, 0-9, +, / (64 characters)
  - = is a padding character
- In 24-bit batches, convert 3 8-bit ASCII sequences to 4 6-bit numbers.

- Base64 encoding is a binary-to-text encoding scheme that is commonly used to represent binary data in a format that can be transmitted over text-based protocols, such as email or HTTP. It converts binary data into a set of 64 ASCII characters (hence the name "Base64") that are safe to transmit.

**Base64 encoding algorithm**:

- Input Data: The algorithm takes a stream of binary data as input. This data can be any type of binary information, such as a file or a binary image.

- Breaking into 6-bit Groups: The input data is divided into groups of 6 bits each. If the length of the input is not a multiple of 6, padding is added to make it a multiple of 6 bits. Padding is achieved by adding zeros at the end of the last group.

- Mapping to Base64 Characters: Each 6-bit group is then mapped to a corresponding Base64 character. Base64 uses a set of 64 characters that consist of uppercase letters (A-Z), lowercase letters (a-z), digits (0-9), and two additional characters such as "+" and "/". These 64 characters are assigned a numerical value ranging from 0 to 63.

- Conversion to ASCII: The numerical values obtained from the previous step are converted to their corresponding ASCII characters using the Base64 character table. Each 6-bit group is represented by a single character.

- Output: The resulting ASCII characters form the Base64 encoded representation of the input binary data.

**For example, let's encode the string "Hello" using Base64**:

- Convert the string "Hello" to its corresponding binary representation:

`01001000 01100101 01101100 01101100 01101111`

- Group the binary data into 6-bit groups:

`010010 000110 010101 101100 110110 110011 011011 110111 1100`

- Map each 6-bit group to a Base64 character:

`S G V s b 3 R 9 w`

- The resulting Base64 encoded string is "SGVsbG8=", which can be safely transmitted over text-based protocols.

**Base64 encoding is commonly used in various applications, including**:

- Email Attachments: Binary files, such as images or documents, are encoded in Base64 format to be included as email attachments.

- Data Transmission: Binary data that needs to be transmitted over protocols that only support text, such as XML or JSON, is often Base64 encoded.

- Data Storage: Base64 encoding is used to store binary data in a text-based format, such as in databases or configuration files.

- Data Representation in URLs: Base64 encoding is sometimes used to represent binary data in URLs, where certain characters are not allowed.

## 2.3 `base64encoder`

```ts
const KEY_STRING =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const EQUALS = 64; // equals sign

export function base64encode(input: string): string {
  let output = "";
  let i = 0;

  while (i < input.length) {
    // process 3 8-bit numbers at a time
    let char1 = input.charCodeAt(i++);
    let char2 = input.charCodeAt(i++);
    let char3 = input.charCodeAt(i++);

    // create 4 6-bit numbers from 3 8-bit numbers (ASCII)

    // retrieve 6 most significant bits of char1
    let enc1 = char1 >> 2;
    // get 2 least significant bits from char1 (AND 0000_0011) (& 3)
    // shift left 4 to append 4 most significant bits fro char1
    let enc2 = ((char1 & 3) << 4) | (char2 >> 4);

    // get 4 (1111 = 15) least significant digits,
    // shift left 2 to append 6 most significant bits fro char3
    let enc3 = ((char2 & 15) << 2) | (char3 >> 6);

    // to retrieve 6 least significant digits & 63 (which is 111111)
    let enc4 = char3 & 63;

    // handle padding

    // if 2nd (and 3rd) octet is empty, zero out last 2 6-bit numbers
    if (isNaN(char2)) {
      enc3 = enc4 = EQUALS;

      // if 3rd octet is empty, zero out last 6-bit number
    } else if (isNaN(char3)) {
      enc4 = EQUALS;
    }

    output =
      output +
      KEY_STRING.charAt(enc1) +
      KEY_STRING.charAt(enc2) +
      KEY_STRING.charAt(enc3) +
      KEY_STRING.charAt(enc4);
  }

  return output;
}
```

## 2.4 Implementing Multiple Encoders

**Why Use Interfaces?**

- 80% of the developer time is spent on understanding code.
- Interfaces provide a **contract** that must be met.
- Helps describe JavaScript objects that otherwise have no context.
- Increases understanding of your codebase.

defining an interface:

```ts
export interface IEncoder {
  (input: string): string;
}
```

## 2.5 Adding Support for Unicode Using Node.js

**Declaration files**

- Used by the TypeScript compiler to understand JavaScript that you don't write
- Declaration Files are essentially an interface for a module that describes an API surface.

```txt
     __________________________________
    |                                  |
your code ---> TS Compiler <----- Declaration Files (.d.ts)  Other Code(.js)
(.ts)              |                                                 |
                   V                                                 |
                Output (.js) -- imported or globally referenced -----

```

```ts
export const base64encode: IEncoder = function (input: string): string {
  // Buffer.from(string[, encoding])
  return Buffer.from(input, "utf-8").toString("base64");
};
```

- Well, apparently, there is no need to write our own implementation of base64encode. We can just use Node's `Buffer`
- you should have `npm i -D @types/node` already.

## 2.6 Adding Another Encoder Implementation

```ts
export interface IEncoder {
  encode(input: string): string;
  decode(input: string): string;
}
```

```ts
export class Base64encoder implements IEncoder {
  encode = (input: string): string =>
    Buffer.from(input, "utf-8").toString("base64");

  decode = (input: string): string =>
    Buffer.from(input, "base64").toString("utf-8");
}
```

```ts
import { IEncoder } from "./IEncoder";

export class UrlEncoder implements IEncoder {
  encode(input: string): string {
    return encodeURI(input);
  }

  decode(input: string): string {
    return decodeURI(input);
  }
}
```

## 2.7 Choosing the Right Encoder with Options

- Paring CLI arguments using a third party module.
- Encapsulating `Options` using classes.
- Decouple dependencies using Type Intersection

- `npm i minimist`, `npm i -D @types/minimist`

encoders.ts:

```ts
import { Base64encoder } from "./base64encoder";
import { UrlEncoder } from "./urlencoder";

const ENCODER_B64 = "base64";
const ENCODER_URL = "url";

export const DEFAULT_ENCODER = ENCODER_B64;

export const encoders = {
  [ENCODER_B64]: new Base64encoder(),
  [ENCODER_URL]: new UrlEncoder(),
};
```

Options.ts:

```ts
import { IEncoder } from "./IEncoder";
import { encoders } from "./encoders";

type EncodersType = keyof typeof encoders;

export interface ProcessArgs {
  readonly encoding: EncodersType;
}

export class Options implements ProcessArgs {
  readonly encoder: IEncoder;
  readonly encoding: EncodersType;
  readonly decode = false;

  constructor(public readonly input: string, args: ProcessArgs) {
    this.encoding = args.encoding;
    this.encoder = encoders[this.encoding];
  }
}
```

index.ts:

```ts
import minimist from "minimist";

import { DEFAULT_ENCODER } from "./encoders";
import { Options, ProcessArgs } from "./Options";

// it would be hard to test, so it should be refactored!
const args = <ProcessArgs & minimist.ParsedArgs>(
  minimist(process.argv.slice(2), {
    alias: { encoding: "e" },
    default: { encoding: DEFAULT_ENCODER },
  })
);

const input = args._.join(" ");
const options = new Options(input, args);

console.log(options.encoder.encode(input));
```

## 2.8 Refactor for testing

- Implement an OptionsParser to abstract minimist.
- Decouple type dependencies using Type Intersection.
- Add a new decode option.
- Guard parameters against runtime errors.

OptionsParser.ts:

```ts
import minimist from "minimist";

import { DEFAULT_ENCODER } from "./encoders";
import { Options, ProcessArgs } from "./Options";

/**
 * Creates a strongly-typed intersection between a given type
 * and the minimist ParsedArgs type.
 */
function minimistAs<T>(
  args?: string[],
  opts?: minimist.Opts
): T & minimist.ParsedArgs {
  return <T & minimist.ParsedArgs>minimist(args, opts);
}

export function fromArgv(argv: string[]): Options {
  const parsedArgs = minimistAs<ProcessArgs>(argv, {
    boolean: "decode",
    alias: { encoding: "e", decode: "d" },
    default: { encoding: DEFAULT_ENCODER },
  });

  return new Options(parsedArgs._.join(""), parsedArgs);
}
```

add decode property in `ProcessArgs`, in Options.ts:

```ts
import { IEncoder } from "./IEncoder";
import { encoders } from "./encoders";

function exitIfNotIn(values: any[], value: any) {
  if (values.indexOf(value) === -1) {
    console.error(`${value} is not a valid value. Valid: ${values.join(", ")}`);
    process.exit(1);
  }
}

function exitIfUndefined(value: any, message: string) {
  if (typeof value === "undefined") {
    console.error(message);
    process.exit(1);
  }
}

const encodingChoices = Object.keys(encoders).join(", ");

type EncodersType = keyof typeof encoders;

export interface ProcessArgs {
  readonly encoding: string;
  readonly decode: boolean;
}

export class Options implements ProcessArgs {
  readonly encoder: IEncoder;
  readonly encoding: string;
  readonly decode: boolean;

  constructor(public readonly input: string, args: ProcessArgs) {
    exitIfUndefined(input, "Please pass an input string to encode");
    exitIfUndefined(
      args.encoding,
      `Please pass a valid encoder option: ${encodingChoices}`
    );
    exitIfUndefined(
      args.decode,
      "Please pass a valid decode option: true or false."
    );
    exitIfNotIn(Object.keys(encoders), args.encoding);

    this.decode = args.decode;
    this.encoding = args.encoding;
    this.encoder = encoders[this.encoding as EncodersType];
  }
}
```

index.ts:

```ts
import { fromArgv } from "./OptionsParser";

const opts = fromArgv(process.argv.slice(2));

console.log("ENCODING:", opts.encoding);
console.log("INPUT:", opts.input);
console.log(
  "OUTPUT:",
  opts.decode
    ? opts.encoder.decode(opts.input)
    : opts.encoder.encode(opts.input)
);
```

`npm run local SGVsbG8gV29ybGQg8J+QuA== --decode`

## 2.9 Applying SOLID Principles

**Overview of SOLID**:

- Proposed by Robert C. Martin in the early 2000s.
- Primarily geared towards object-oriented designs.
- Promotes maintainable and decoupled code.
- They are merely principles, not truths.

<br>

- Single Responsibility
- Open / Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

---

**Single Responsibility**

- A class (function) should only have a single responsibility

  - aka, there should only be one reason to change

- In our case: `IEncoder` (Base64 and URL)

  - Encodes and decodes a string using a single encoding type.

- `encoders`

  - Exposes the list of available encoders.

- `Options`

  - Encapsulates the options of our application
  - But, we could extract the assertion helpers (!)

- `OptionsParser`

  - Parses arguments from CLI to form `Options`

- `index`:
  - Outputs the result

---

**Open / Close**

- Entities (class, function, module) should be open for extension but closed for modification.

- `IEncoder`

  - Open to be implemented

- Base64 and URL Encoder

  - Can't really be extended

- `encoders`

  - Can add or replace encoders using `[]` syntax.

- `Options`

  - Could extend using another class

- `OptionsParser`
  - Can't really be extended if you wanted a different `Options` object

---

**Liskov Substitution**

- An Entity S that is a subtype of T can be substituted wherever T is used and correctness of the system is preserved.

---

**Interface Segregation**

- No entity should be forced to rely on methods it does not use

  - aka 'role interfaces'

- `IEncoder`
  - Only two methods, `encode()` and `decode()`, both of which are required for an encoding implementation.

---

**Dependency Inversion**

- High-level modules should not depend on low-level modules. Both should depend on abstractions.

- Abstractions should not depend on details. Details should depend on abstractions.

```txt

process      Minnimist      ProcessArgs      Base64
   |              |       /        |            |
 index------>OptionsParser----->Options----> IEncoder<----URL

```
