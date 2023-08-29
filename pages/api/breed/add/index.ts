import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { getServerSession } from "next-auth/next";

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

    const breed = await prisma.breed.create({
      data: {
        title: fields.title,
      },
    });

    return breed
      ? res.status(200).json(breed)
      : res.status(404).json({ error: `No breed created.` });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
