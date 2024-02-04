import { writeFile } from "node:fs/promises";
import { operationFailed } from "../errors.js";

export const create = async (file) => {
  try {
    await writeFile(file, "", {
      flag: "ax",
    });

    console.log(`File ${file} has been created`);
  } catch {
    throw operationFailed;
  }
};
