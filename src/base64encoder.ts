import { IEncoder } from "./IEncoder";

const KEY_STRING =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const EQUALS = 64; // equals sign

/*
3 = 011
7 = 111
15 = 1111
31 = 11111
63 = 111111

0110_1000 0110_0001 0111_0101 ====> 3 8-bit numbers

>> 2 each, for example: 
        1: 0110_1000 >> 2 = 011010
        2: ((0110_1000 & 3) << 4) | (0110_0001 >> 4) = 000000 | 0110 = 000110  
        3: ((0110_0001 & 15) << 2) | (0111_0101 >> 6) = 000100 | 01 = 000101
        4: ( 0111_0101 & 63  ) =  11 01 01

011010 000110 000101 110101   ====> 4 6-bit numbers 

*/

export class Base64encoder implements IEncoder {
  encode = (input: string): string =>
    Buffer.from(input, "utf-8").toString("base64");

  decode = (input: string): string =>
    Buffer.from(input, "base64").toString("utf-8");
}

/*
const myOwnBase64encode = function (input: string): string {
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
};
*/
