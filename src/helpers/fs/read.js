import { readFile } from "node:fs/promises";
import { checkIsFileExists } from "../checkIsFileExists.js";
import { operationFailed } from "../errors.js";

export const read = async (file) => {
  try {
    await checkIsFileExists(file);
    const content = await readFile(file, { encoding: "utf8" });
    console.log(content);
  } catch (e) {
    throw operationFailed;
  }
};
