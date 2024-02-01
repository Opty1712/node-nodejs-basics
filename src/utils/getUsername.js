export const getUsername = () => {
  const args = process.argv.slice(2);

  return args[0]?.split("=")?.[1];
};
