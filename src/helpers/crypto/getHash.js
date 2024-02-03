import { createHash } from "crypto";
import { createReadStream } from "fs";

export const getHash = async (file) => {
  return new Promise((resolve, reject) => {
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

    rs.on("error", reject);
  });
};
