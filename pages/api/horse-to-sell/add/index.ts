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
    const dir = join(`${serverLibraryPath}`, "chevaux_a_vendre", `${dirName}`);

    createDir(dir);

    const newHorse = await prisma.horseToSell.create({
      data: {
        name: fields.name,
        price: fields.price,
        breed: fields.breed,
        breeder: fields.breeder,
        description: fields.description,
        dateOfBirth: parse(fields.dateOfBirth, "dd/MM/yyyy", new Date()),
        sire: fields.sire,
        dam: fields.dam,
        damSire: fields.damSire,
        sex: fields.sex,
        colour: fields.colour,
        height: Number(fields.height),
      },
    });

    let albumImages: Enumerable<any> = [];

    for await (const file of files) {
      const filepath = `${dir}/${file.originalname}`;
      const fileInfo = await resizeAndSaveImage(file.buffer, filepath);
      if (file.fieldname === "mainFile") {
        await prisma.horseToSellImage.create({
          data: {
            filename: file.originalname,
            width: fileInfo.width,
            height: fileInfo.height,
            horseToSellImgId: newHorse.id,
          },
        });
      } else {
        albumImages.push({
          filename: file.originalname,
          width: fileInfo.width,
          height: fileInfo.height,
          horseToSellAlbumId: newHorse.id,
        });
      }
    }

    if (albumImages.length > 0) {
      await prisma.horseToSellImage.createMany({
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
