import {
  exit,
  getRLService,
  getUsername,
  handleInput,
  init,
  operationFailed,
  showDirectory,
} from "./helpers/index.js";

const rl = getRLService();
const userName = getUsername();

init(userName, rl);

rl.on("SIGINT", () => {
  exit(userName);
});

rl.on("line", async (data) => {
  await handleInput(data, userName, rl);
  showDirectory();
  rl.prompt();
});

process.on("uncaughtException", () => {
  console.log(`\x1b[31m${operationFailed}\x1b[0m`);
  showDirectory();
  rl.prompt();
});
