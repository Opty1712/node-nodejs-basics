import { userInfo } from "os";

export const showUsername = () => console.log(userInfo().username);
