import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import { resizeAndSaveImage } from "@/utils/serverSideUtils";
import { createDir, parseFormData } from "@/utils/serverSideUtils";
import { getDirnameFromString } from "@/utils/commonUtils";
import { Prisma } from ".prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { fields, files } = await parseFormData(req, res);
    const dirName = getDirnameFromString(fields.name);
    const dir = join(`${serverLibraryPath}`, "chevaux", `${dirName}`);

    createDir(dir);

    const newHorse = await prisma.horse.create({
      data: {
        name: fields.name,
        description: fields.description,
        dateOfBirth: parse(fields.dateOfBirth, "dd/MM/yyyy", new Date()),
        sire: fields.sire,
        dam: fields.dam,
        damSire: fields.damSire,
        owner: fields.owner,
        sex: fields.sex,
        colour: fields.colour,
        height: Number(fields.height),
        breeder: fields.breeder,
        breed: fields.breed,
        isToSell: fields.isToSell.toLowerCase() === "true",
        price: fields.price,
      },
    });

    let albumImages: Enumerable<any> = [];

    for await (const file of files) {
      const filepath = `${dir}/${file.originalname}`;
      const fileInfo = await resizeAndSaveImage(file.buffer, filepath);
      if (file.fieldname === "mainFile") {
        await prisma.horseImage.create({
          data: {
            filename: file.originalname,
            width: fileInfo.width,
            height: fileInfo.height,
            horseImgId: newHorse.id,
          },
        });
      } else {
        albumImages.push({
          filename: file.originalname,
          width: fileInfo.width,
          height: fileInfo.height,
          horseAlbumId: newHorse.id,
        });
      }
    }

    if (albumImages.length > 0) {
      await prisma.horseImage.createMany({
        data: albumImages,
      });
    }
    return res.status(200).redirect("/admin");
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
