import { compress, decompress } from "./archive/index.js";
import { getHash } from "./crypto/index.js";
import { invalidInput, operationFailed, pathWarning } from "./errors.js";
import { extractArgumentsFromInput } from "./extractArgumentsFromInput.js";
import {
  copy,
  create,
  list,
  move,
  navigate,
  read,
  remove,
  rename,
} from "./fs/index.js";
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
    cat: async () => {
      const args = extractArgumentsFromInput("cat", clearData, 1);
      await read(args[0]);
    },
    add: async () => {
      const args = extractArgumentsFromInput("add", clearData, 1);
      await create(args[0]);
    },
    rn: async () => {
      const [fileFrom, fileTo] = extractArgumentsFromInput("rn", clearData, 2);
      await rename(fileFrom, fileTo);
    },
    cp: async () => {
      const [fileFrom, fileTo] = extractArgumentsFromInput("cp", clearData, 2);
      await copy(fileFrom, fileTo);
    },
    mv: async () => {
      const [fileFrom, fileTo] = extractArgumentsFromInput("mv", clearData, 2);
      await move(fileFrom, fileTo);
    },
    rm: async () => {
      const args = extractArgumentsFromInput("rm", clearData, 1);
      await remove(args[0]);
    },
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
      console.log(`\x1b[31m${e || operationFailed}\x1b[0m`);
      console.log(pathWarning);
      // console.log(e);
    }
  } else {
    console.log(`\x1b[31m${invalidInput}\x1b[0m`);
    console.log(pathWarning);
  }
};
