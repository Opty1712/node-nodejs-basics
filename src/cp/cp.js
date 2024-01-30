import { spawn } from "child_process";

const __dirname = import.meta.dirname;

const spawnChildProcess = async (args) => {
  const spawned = spawn("node", [
    __dirname + "/files/script.js",
    ...(args || []),
  ]);

  spawned.stdout.on("data", (data) => {
    process.stdin.write(data);
  });

  spawned.stdin.on("data", (data) => {
    process.stdout.write(data);
  });

  process.stdout.on("data", (data) => {
    spawned.stdin.write(data);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
