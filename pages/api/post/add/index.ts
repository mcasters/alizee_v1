import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import { getActuPath, resizeAndSaveImage } from "@/utils/serverSideUtils";
import { createDir, parseFormData } from "@/utils/serverSideUtils";
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
    const dir = getActuPath(fields.title);

    createDir(dir);

    /*

    const tagsToArray = fields.tags.split(",").map(Number);
    const tags = tagsToArray.map((tid: number) => {
      return { id: tid };
    });

     */

    const newPost = await prisma.post.create({
      data: {
        title: fields.title,
        date: parse(fields.date, "dd/MM/yyyy", new Date()),
        content: fields.content,
      },
    });

    let albumImages: Enumerable<any> = [];

    for await (const file of files) {
      const filepath = `${dir}/${file.originalname}`;
      const fileInfo = await resizeAndSaveImage(file.buffer, filepath);
      if (file.fieldname === "mainFile") {
        await prisma.postImage.create({
          data: {
            filename: file.originalname,
            width: fileInfo.width,
            height: fileInfo.height,
            postImgId: newPost.id,
          },
        });
      } else {
        albumImages.push({
          filename: file.originalname,
          width: fileInfo.width,
          height: fileInfo.height,
          postAlbumId: newPost.id,
        });
      }
    }

    if (albumImages.length > 0) {
      await prisma.postImage.createMany({
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
