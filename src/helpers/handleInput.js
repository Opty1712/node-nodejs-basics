import { compress, decompress } from "./archive/index.js";
import { getHash } from "./crypto/index.js";
import { extractArgumentsFromInput } from "./extractArgumentsFromInput.js";
import { list, navigate } from "./fs/index.js";
import { handleExit } from "./handleExit.js";
import {
  getCPUInfo,
  showArch,
  showEOL,
  showHomeDir,
  showUsername,
} from "./os/index.js";

export const handleInput = async (data, userName) => {
  const clearData = data.trim();

  const commands = {
    ".exit": () => handleExit(clearData, userName),
    up: () => navigate("../"),
    cd: () => {
      const args = extractArgumentsFromInput("cd", clearData, 1);
      navigate(args[0]);
    },
    ls: list,
    hash: async () => {
      const args = extractArgumentsFromInput("hash", clearData, 1);
      await getHash(args[0]);
    },
    compress: async () => {
      const [fileFrom, fileTo] = extractArgumentsFromInput(
        "compress",
        clearData,
        2
      );

      await compress(fileFrom, fileTo);
    },
    decompress: async () => {
      const [fileFrom, fileTo] = extractArgumentsFromInput(
        "decompress",
        clearData,
        2
      );

      await decompress(fileFrom, fileTo);
    },
    "os --EOL": showEOL,
    "os --homedir": showHomeDir,
    "os --cpus": getCPUInfo,
    "os --username": showUsername,
    "os --architecture": showArch,
  };

  const keys = Object.keys(commands);

  if (clearData === "HELP") {
    console.log(keys);
    return;
  }

  const command = keys.find((key) => clearData.startsWith(key));

  if (command) {
    try {
      await commands[command]();
    } catch (e) {
      console.log(`\x1b[31m${e || "Operation failed"}\x1b[0m`);
      console.log(
        '\x1b[33mIf any path contains spaces → use quotes for all paths, f.e. «cp "my dir/my file.js" "dest.js"»\x1b[0m'
      );
      // console.log(e);
    }
  } else {
    console.log("\x1b[31mInvalid input\x1b[0m");
    console.log(
      '\x1b[33mIf any path contains spaces → use quotes for all paths, f.e. «cp "my dir/my file.js" "dest.js"»\x1b[0m'
    );
  }
};
