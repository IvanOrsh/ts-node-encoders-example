import { fromArgv } from "./fromArgv";

const opts = fromArgv(process.argv.slice(2));

console.log("ENCODING:", opts.encoding);
console.log("INPUT:", opts.input);
if (opts.input) {
  console.log(
    "OUTPUT:",
    opts.decode
      ? opts.encoder.decode(opts.input)
      : opts.encoder.encode(opts.input)
  );
}
