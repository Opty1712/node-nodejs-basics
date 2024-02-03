import { createReadStream, createWriteStream } from "fs";
import { createBrotliDecompress } from "zlib";

export const decompress = async (fileFrom, fileTo) => {
  return new Promise((resolve, reject) => {
    const brotli = createBrotliDecompress();
    const rs = createReadStream(fileFrom);
    const ws = createWriteStream(fileTo);

    rs.pipe(brotli).pipe(ws);

    rs.on("end", () => {
      console.log("Completed");
      resolve();
    });

    rs.on("error", reject);
  });
};
