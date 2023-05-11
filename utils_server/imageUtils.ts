import sharp from "sharp";

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
          Copyright: "Marion Casters",
        },
      },
    })
    .toFormat("jpeg")
    .toFile(filepath);
};
