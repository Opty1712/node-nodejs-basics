import {
  exit,
  getRLService,
  getUsername,
  handleInput,
  init,
  showDirectory,
} from "./helpers/index.js";

const rl = getRLService();
const userName = getUsername();

init(userName, rl);

rl.on("SIGINT", () => {
  exit(userName);
});

rl.on("line", async (data) => {
  await handleInput(data, userName);
  showDirectory();
  rl.prompt();
});
