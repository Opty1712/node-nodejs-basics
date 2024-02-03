import { createInterface } from "readline/promises";

export const getRLService = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ">>>your command here, to list available commands send HELP>>>",
  });

  return rl;
};
