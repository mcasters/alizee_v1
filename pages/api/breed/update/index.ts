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
    const breedId = Number(fields.id);
    const oldBreed = await prisma.breed.findUnique({
      where: { id: breedId },
    });

    if (oldBreed) {
      const breedUpdated = await prisma.breed.update({
        where: { id: breedId },
        data: {
          title: fields.title,
        },
      });

      return breedUpdated
        ? res.status(200).redirect("/admin")
        : res.status(404).json({ error: `No breed updated.` });
    } else {
      return res.status(404).json({ error: `No breed found.` });
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
