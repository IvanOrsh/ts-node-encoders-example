import { IEncoder } from "./IEncoder";

export class UrlEncoder implements IEncoder {
  encode(input: string): string {
    return encodeURI(input);
  }

  decode(input: string): string {
    return decodeURI(input);
  }
}
