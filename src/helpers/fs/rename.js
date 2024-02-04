import { rename as fsRename } from "node:fs/promises";
import { checkIsFileExists } from "../checkIsFileExists.js";
import { operationFailed } from "../errors.js";

export const rename = async (fromFile, toFile) => {
  try {
    const isFromFileExist = await checkIsFileExists(fromFile, false);
    const isToFileExist = await checkIsFileExists(toFile, false);

    if (!isFromFileExist || isToFileExist) {
      throw operationFailed;
    }

    await fsRename(fromFile, toFile);

    console.log("Rename completed");
  } catch (e) {
    if (e.code !== "ENOENT") {
      throw operationFailed;
    }
  }
};
