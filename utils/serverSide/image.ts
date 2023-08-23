import sharp from "sharp";
import { rm } from "fs";

const serverLibraryPath = process.env.PHOTOS_PATH;

export const resizeAndSaveImage = async (file: Buffer, filepath: string) => {
  const px = 400;
  // const bufferFile = Buffer.from(await file.arrayBuffer());
  const image = sharp(file);

  return image
    .resize(px, px, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .withMetadata({
      exif: {
        IFD0: {
          Copyright: "Alizée Roussel",
        },
      },
    })
    .toFormat("jpeg")
    .toFile(filepath);
};

export const deleteImages = async (pathDir: string) => {
  rm(pathDir, { recursive: true }, (err) => {
    if (err) return false;
  });
  return true;
};
