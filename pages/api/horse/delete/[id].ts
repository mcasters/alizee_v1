import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { deleteImages } from "@/utils/serverSide/image";
import { getDirnameFromTitle } from "@/utils/common/post";
import { join } from "path";

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = req.query.id;

    let horseDeleted = null;
    const horse = await prisma.horse.findUnique({
      where: { id: Number(id) },
    });

    if (horse) {
      const dirName = getDirnameFromTitle(horse.name);
      const pathDir = join(`${serverLibraryPath}`, "chevaux", `${dirName}`);
      if (deleteImages(pathDir)) {
        horseDeleted = await prisma.horse.delete({
          where: { id: Number(id) },
        });
      }
    }
    return horseDeleted
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No horse found.` });
  } else {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
