import { Base64encoder } from "./base64encoder";
import { UrlEncoder } from "./urlencoder";

const ENCODER_B64 = "base64";
const ENCODER_URL = "url";

export const DEFAULT_ENCODER = ENCODER_B64;

export const encoders = {
  [ENCODER_B64]: new Base64encoder(),
  [ENCODER_URL]: new UrlEncoder(),
};
