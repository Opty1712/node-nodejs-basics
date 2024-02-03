export const navigate = (command) => {
  if (command === "up") {
    process.chdir("../");
  } else {
    const args = command.split(" ");
    return process.chdir(args[1]);
  }
};
