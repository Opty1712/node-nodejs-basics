import { createReadStream, createWriteStream } from "fs";
import { rm } from "fs/promises";
import { checkIsFileExists } from "../checkIsFileExists.js";
import { operationFailed } from "../errors.js";

export const move = async (fromFile, toFile) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isFromFileExist = await checkIsFileExists(fromFile, false);
      const isToFileExist = await checkIsFileExists(toFile, false);

      if (!isFromFileExist || isToFileExist) {
        throw operationFailed;
      }

      const rs = createReadStream(fromFile);
      const ws = createWriteStream(toFile);
      rs.pipe(ws);

      rs.on("end", async () => {
        await rm(fromFile);
        console.log("Movement completed");
        resolve();
      });

      rs.on("error", reject);
    } catch (e) {
      if (e.code !== "ENOENT") {
        reject();
      }
    }
  });
};
