import { homedir as getHomeDir } from "os";
export const homedir = getHomeDir();

export const showHomeDir = () => console.log(getHomeDir());
