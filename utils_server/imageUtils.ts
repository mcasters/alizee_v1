import sharp from "sharp";
import { NextApiRequest } from "next";
import { join } from "path";
import { mkdir, stat, rename } from "fs";
import Formidable from "formidable";

const serverLibraryPath = process.env.PHOTOS_PATH;

/****************
 * End entry point *
 ****************/

export const parseFormData = async (req: NextApiRequest): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    const form = Formidable({
      uploadDir: join(`${serverLibraryPath}`, `actu`),
      keepExtensions: true,
      allowEmptyFiles: true,
      multiples: true,
      minFileSize: 0,
    });

    const files = [];
    const fields = [];
    let postDir: string = "";

    form.on("field", (formName, value) => {
      if (formName === "title") {
        const dirName = value.toLowerCase().split(" ").join("_");
        postDir = join(`${form.options.uploadDir}`, `${dirName}`);
        console.log("postDir");
        console.log(postDir);

        stat(postDir, (err) => {
          if (err?.code === "ENOENT") {
            mkdir(postDir, { recursive: true }, (err) => {
              reject(err);
              return;
            });
          } else {
            reject(err);
            return;
          }
        });
      }
    });

    form.on("file", (formName, file) => {
      rename(file.filepath, `${postDir}/${file.originalFilename}`, (err) => {
        reject(err);
        return;
      });
      file.filepath = `${postDir}/${file.originalFilename}`;
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }

      console.log("{ fields }");
      console.log(fields);

      console.log("mainFile");
      console.log(files.mainFile);
      console.log("albumFile");
      console.log(files.albumFiles);
      resolve("post enregistré");
      return;
    });
  });
};

export const storeImage = async (file) => {
  console.log(file);
  const dest = `${serverLibraryPath}/actu`;
  const px = 0;
  const bufferFile = Buffer.from(await file.arrayBuffer());
  const image = sharp(bufferFile);

  return px === 0
    ? image
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: "Marion Casters",
            },
          },
        })
        .webp({
          quality: 80,
        })
        .toFile(dest, (err) => !err)
    : image
        .resize(px, px, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
        .withMetadata({
          exif: {
            IFD0: {
              Copyright: "Marion Casters",
            },
          },
        })
        .webp({
          quality: 80,
        })
        .toFile(dest, (err) => !err);
};
