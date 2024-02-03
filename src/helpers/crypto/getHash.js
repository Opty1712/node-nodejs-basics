import { createHash } from "crypto";
import { createReadStream } from "fs";

const __dirname = import.meta.dirname;

export const getHash = async (data) => {
  const promise = new Promise((resolve) => {
    const file = data.split(" ")[1];
    let content = "";
    const rs = createReadStream(file);

    rs.on("data", (data) => {
      content += data.toString();
    });

    rs.on("end", () => {
      const hashSum = createHash("sha256");
      hashSum.update(content);
      const hex = hashSum.digest("hex");

      process.stdout.write(`${hex}\n`);
      resolve();
    });
  });

  return promise;
};
