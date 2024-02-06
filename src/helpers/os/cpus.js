import { cpus } from "os";

const cpuInfo = cpus();

export const getCPUInfo = () => {
  console.log(`Total cores: ${cpuInfo.length}`);
  console.table(
    cpuInfo.map(({ model, speed }) => ({
      model,
      speed: `${speed / 1000} GHz`,
    }))
  );
};
