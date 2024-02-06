import { rm } from "fs/promises";
import { operationFailed } from "../errors.js";

export const remove = async (file) => {
  try {
    await rm(file, { recursive: true });
    console.log("Deletion completed");
  } catch {
    throw operationFailed;
  }
};
