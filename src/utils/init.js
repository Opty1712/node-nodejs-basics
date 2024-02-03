import { homedir } from "os";
import { showDirectory } from "./showDirectory.js";

export const init = (userName, rl) => {
  process.chdir(homedir());
  console.log(`Welcome to the File Manager, ${userName}!`);
  showDirectory();
  rl.prompt();
};
