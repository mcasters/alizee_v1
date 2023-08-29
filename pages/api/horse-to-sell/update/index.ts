import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import {
  deleteFile,
  getHorseToSellPath,
  renameDir,
  resizeAndSaveImage,
} from "@/utils/serverSideUtils";
import { parseFormData } from "@/utils/serverSideUtils";
import prisma from "@/lib/prisma";
import { Prisma } from ".prisma/client";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { fields, files } = await parseFormData(req, res);
    const id = Number(fields.id);

    const oldHorse = await prisma.horseToSell.findUnique({
      where: { id },
    });

    if (oldHorse) {
      const dir = getHorseToSellPath(fields.name);
      const oldMainFileToKeep = fields.existentMainFile;
      const oldAlbumFilesToKeep: string[] =
        fields.existentAlbumFiles.split(",");

      if (oldHorse.name !== fields.name) {
        const oldDir = getHorseToSellPath(oldHorse.name);
        renameDir(oldDir, dir);
      }

      const horse = await prisma.horseToSell.update({
        where: { id: id },
        data: {
          name: fields.name,
          description: fields.description,
          dateOfBirth: parse(fields.dateOfBirth, "dd/MM/yyyy", new Date()),
          sire: fields.sire,
          dam: fields.dam,
          damSire: fields.damSire,
          breed: fields.breed,
          breeder: fields.breeder,
          price: fields.price,
          sex: fields.sex,
          colour: fields.colour,
          height: Number(fields.height),
        },
        select: {
          mainImage: true,
          images: true,
        },
      });

      if (oldMainFileToKeep === "" && horse.mainImage !== null) {
        await prisma.horseToSellImage.delete({
          where: {
            horseToSellImgId: id,
          },
        });
        const path = join(`${dir}`, `${horse.mainImage.filename}`);
        deleteFile(path);
      }

      if (oldAlbumFilesToKeep.length === 0 && horse.images.length > 0) {
        await prisma.horseToSellImage.deleteMany({
          where: {
            horseToSellAlbumId: id,
          },
        });
        for (const image of horse.images) {
          const path = join(`${dir}`, `${image.filename}`);
          deleteFile(path);
        }
      } else {
        for (const image of horse.images) {
          if (!oldAlbumFilesToKeep.find((f) => f === image.filename)) {
            await prisma.horseToSellImage.delete({
              where: {
                id: Number(image.id),
              },
            });
            const path = join(`${dir}`, `${image.filename}`);
            deleteFile(path);
          }
        }
      }

      let albumImages: Enumerable<any> = [];

      for await (const file of files) {
        const path = join(`${dir}`, `${file.originalname}`);
        const fileInfo = await resizeAndSaveImage(file.buffer, path);
        if (file.fieldname === "mainFile") {
          await prisma.horseToSellImage.create({
            data: {
              filename: file.originalname,
              width: fileInfo.width,
              height: fileInfo.height,
              horseToSellImgId: id,
            },
          });
        } else {
          albumImages.push({
            filename: file.originalname,
            width: fileInfo.width,
            height: fileInfo.height,
            horseToSellAlbumId: id,
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
      return res.status(404).json({ error: `No horse to sell found.` });
    }
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
