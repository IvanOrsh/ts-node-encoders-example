export interface IEncoder {
  encode(input: string): string;
  decode(input: string): string;
}
