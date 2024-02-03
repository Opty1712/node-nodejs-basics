import { list, navigate } from "./fs/index.js";
import { handleExit } from "./handleExit.js";

export const handleInput = async (data, userName) => {
  const clearData = data.trim();

  const commands = {
    ".exit": () => handleExit(clearData, userName),
    up: () => navigate(clearData),
    cd: () => navigate(clearData),
    list,
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
      console.log("Operation failed");
      // console.log( e);
    }
  } else {
    console.log("Invalid input");
  }
};
