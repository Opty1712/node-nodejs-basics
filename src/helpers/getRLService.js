import { createInterface } from "readline/promises";

export const getRLService = () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt:
      ">>>send your command here (to list all available commands send HELP)>>>",
  });

  return rl;
};
