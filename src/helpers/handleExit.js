import { exit } from "./exit.js";

export const handleExit = (data, userName) => {
  if (data.includes(".exit")) {
    exit(userName);
  }
};
