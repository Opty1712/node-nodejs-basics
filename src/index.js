import { getUsername, handleExit } from "./utils/index.js";

const userName = getUsername();

console.log(`Welcome to the File Manager, ${userName || "unknown user"}!`);

process.stdin.on("data", (data) => {
  const stringifiedData = data.toString();

  if (stringifiedData.includes(".exit")) {
    handleExit(userName);
  }
});

process.on("SIGINT", () => {
  handleExit(userName);
});
