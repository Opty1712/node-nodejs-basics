import { EOL } from "./os/EOL.js";

export const showDirectory = () => {
  console.log(`${EOL}${EOL}You are currently in ${process.cwd()}`);
};
