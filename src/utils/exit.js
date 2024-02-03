import { EOL } from "./os/EOL.js";

export const exit = (userName) => {
  console.log(`${EOL}Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};
