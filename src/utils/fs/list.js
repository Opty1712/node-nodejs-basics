import { readdir } from "node:fs/promises";

export const list = async () => {
  const fileList = await readdir(process.cwd(), { withFileTypes: true });
  const table = fileList.map((file) => ({
    name: file.name,
    type: file.isDirectory() ? "directory" : "file",
  }));

  console.table(table);
};
