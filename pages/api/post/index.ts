import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;

import { resizeAndSaveImage } from "@/utils_server/imageUtils";
import {
  createPostDir,
  getDirnameFromTitle,
  parseFormData,
} from "@/utils_server/postUtils";
import { Prisma } from ".prisma/client";
import { fi } from "date-fns/locale";

const serverLibraryPath = process.env.PHOTOS_PATH;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
      tags: {
        connect: tags,
      },
    },
  });

  const images: Enumerable<any> = [];

  for await (const file of files) {
    const filepath = `${postDir}/${file.originalname}`;
    const fileInfo = await resizeAndSaveImage(file.buffer, filepath);
    images.push({
      filename: file.originalname,
      width: fileInfo.width,
      height: fileInfo.height,
      isMain: file.fieldname === "mainFile",
      postId: newPost.id,
    });
  }

  await prisma.image.createMany({
    data: images,
  });

  res.status(200).redirect("/admin");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
