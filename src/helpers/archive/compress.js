import { createReadStream, createWriteStream } from "fs";
import { createBrotliCompress } from "zlib";

export const compress = async (fileFrom, fileTo) => {
  return new Promise((resolve, reject) => {
    const brotli = createBrotliCompress();
    const rs = createReadStream(fileFrom);
    const ws = createWriteStream(fileTo);

    rs.pipe(brotli).pipe(ws);

    rs.on("end", () => {
      console.log("File compressed");
      resolve();
    });

    rs.on("error", reject);
  });
};
