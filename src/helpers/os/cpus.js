import { cpus } from "os";

const cpuInfo = cpus();

export const getCPUInfo = () =>
  console.log(
    `CPU info: ${cpuInfo[0].model}, ${cpuInfo.length} cores, ${
      cpuInfo[0].speed / 1000
    } GHz.`
  );
