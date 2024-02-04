import { access } from "node:fs/promises";

export const checkIsFileExists = async (file) => {
  try {
    await access(file);
    return true;
  } catch (e) {
    if (e.code === "ENOENT") {
      console.log(`\x1b[33mFile «${file}» does not exist\x1b[0m`);
    }

    return false;
  }
};
