import { showEOL } from "./EOL.js";
import { showArch } from "./arch.js";
import { getCPUInfo } from "./cpus.js";
import { showHomeDir } from "./homedir.js";
import { showUsername } from "./username.js";

const commands = {
  EOL: showEOL,
  homedir: showHomeDir,
  cpus: getCPUInfo,
  username: showUsername,
  architecture: showArch,
};

export const handleOSCommands = (data) => {
  const command = data.split("os --")[1];

  commands[command]?.();
};

export const OSCommands = Object.keys(commands).map((key) => `os --${key}`);
