import { readdir } from "node:fs/promises";

export const list = async () => {
  const fileList = await readdir(process.cwd(), { withFileTypes: true });
  const table = fileList
    .map((file) => ({
      name: file.name,
      type: file.isDirectory() ? "directory" : "file",
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => a.type.localeCompare(b.type));

  console.table(table);
};
