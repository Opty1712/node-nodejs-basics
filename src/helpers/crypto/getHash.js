import { createHash } from "crypto";
import { createReadStream } from "fs";
import { checkIsFileExists } from "../checkIsFileExists.js";

export const getHash = async (file) => {
  return new Promise(async (resolve, reject) => {
    const isFileExists = await checkIsFileExists(file);

    if (!isFileExists) {
      reject();
    }

    const hash = createHash("sha256");
    const rs = createReadStream(file);

    rs.on("readable", () => {
      const data = rs.read();

      if (data) {
        hash.update(data);
      } else {
        console.log(`${hash.digest("hex")}`);
        resolve();
      }
    });

    rs.on("error", reject);
  });
};
