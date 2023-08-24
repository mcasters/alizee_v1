import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getDirnameFromString } from "@/utils/commonUtils";
import { join } from "path";
import { deleteAllFiles, getActuPath } from "@/utils/serverSideUtils";

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = req.query.id;

    let postDeleted = null;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (post) {
      const dir = getActuPath(post.title);
      if (deleteAllFiles(dir)) {
        postDeleted = await prisma.post.delete({
          where: { id: Number(id) },
        });
      }
    }
    return postDeleted
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No post found.` });
  } else {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
