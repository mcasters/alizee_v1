import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import { resizeAndSaveImage } from "@/utils/serverSide/image";
import { createPostDir, parseFormData } from "@/utils/serverSide/post";
import { getDirnameFromTitle } from "@/utils/common/post";
import { Prisma } from ".prisma/client";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Image } from "@/interfaces/index";

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const { fields, files } = await parseFormData(req, res);
    const dirName = getDirnameFromTitle(fields.title);
    const postDir = join(`${serverLibraryPath}`, "actu", `${dirName}`);

    createPostDir(postDir);

    const tagsToArray = fields.tags.split(",").map(Number);
    const tags = tagsToArray.map((tid: number) => {
      return { id: tid };
    });

    const newPost = await prisma.post.create({
      data: {
        title: fields.title,
        date: parse(fields.date, "dd/MM/yyyy", new Date()),
        content: fields.content,
        published: fields.published === "on",
      },
    });

    let albumImages: Enumerable<any> = [];

    for await (const file of files) {
      const filepath = `${postDir}/${file.originalname}`;
      const fileInfo = await resizeAndSaveImage(file.buffer, filepath);
      if (file.fieldname === "mainFile") {
        await prisma.image.create({
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
      await prisma.image.createMany({
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
