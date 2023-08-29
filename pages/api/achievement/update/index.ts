import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import {
  deleteFile,
  getHorsePath,
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
    const { fields } = await parseFormData(req, res);
    const id = Number(fields.id);
    const oldAchievement = await prisma.achievements.findUnique({
      where: { id },
    });

    if (oldAchievement) {
      const updatedAchievement = await prisma.achievements.update({
        where: { id: id },
        data: {
          year: fields.year,
          title: fields.title,
          location: fields.location,
        },
      });

      return updatedAchievement
        ? res.status(200).json(updatedAchievement)
        : res.status(404).json({ error: `No achievement updated.` });
    } else {
      return res.status(404).json({ error: `No achievement found.` });
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
