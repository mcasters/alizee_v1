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
    const { fields } = await parseFormData(req, res);
    const isHorseToSell = !fields.horseId;

    const data = isHorseToSell
      ? {
          year: Number(fields.year),
          title: fields.title,
          location: fields.location,
          horseToSellId: Number(fields.horseToSellId),
        }
      : {
          year: Number(fields.year),
          title: fields.title,
          location: fields.location,
          horseId: Number(fields.horseId),
        };
    const achievement = await prisma.achievement.create({
      data,
    });

    return achievement
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No achievement created.` });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
