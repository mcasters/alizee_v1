import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getDirnameFromTitle } from "@/utils/common/post";
import { join } from "path";
import { deleteImages } from "@/utils/serverSide/image";

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
      const dirName = getDirnameFromTitle(post.title);
      const pathDir = join(`${serverLibraryPath}`, "actu", `${dirName}`);
      if (deleteImages(pathDir)) {
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
