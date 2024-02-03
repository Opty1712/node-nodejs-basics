import { getHash } from "./crypto/index.js";
import { list, navigate } from "./fs/index.js";
import { handleExit } from "./handleExit.js";
import { OSCommands, handleOSCommands } from "./os/index.js";

export const handleInput = async (data, userName) => {
  const clearData = data.trim();

  const fsCommands = {
    ".exit": async () => handleExit(clearData, userName),
    up: async () => navigate(clearData),
    cd: async () => navigate(clearData),
    ls: list,
    hash: async () => getHash(clearData),
  };

  const FSKeys = Object.keys(fsCommands);

  const allCommands = {
    ...fsCommands,
    "os --": async () => handleOSCommands(clearData),
  };

  const allKeys = Object.keys(allCommands);

  if (clearData === "HELP") {
    console.log([...FSKeys, ...OSCommands]);
    return;
  }

  const command = allKeys.find((key) => clearData.startsWith(key));

  if (command) {
    try {
      await allCommands[command]();
    } catch (e) {
      console.log("Operation failed");
      console.log(e);
    }
  } else {
    console.log("Invalid input");
  }
};
