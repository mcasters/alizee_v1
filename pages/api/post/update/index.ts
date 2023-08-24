import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { join } from "path";
import { parse } from "date-fns";
import Enumerable = Prisma.Enumerable;
import { getServerSession } from "next-auth/next";

import {
  deleteAllFiles,
  deleteFile,
  getActuPath,
  renameDir,
  resizeAndSaveImage,
} from "@/utils/serverSideUtils";
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
    const { fields, files } = await parseFormData(req, res);
    const postId = Number(fields.id);

    const oldPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (oldPost) {
      const dir = getActuPath(fields.title);
      const oldMainFileToKeep = fields.existentMainFile;
      const oldAlbumFilesToKeep: string[] =
        fields.existentAlbumFiles.split(",");

      if (oldPost.title !== fields.title) {
        const oldDir = getActuPath(oldPost.title);
        renameDir(oldDir, dir);
      }

      const post = await prisma.post.update({
        where: { id: postId },
        data: {
          title: fields.title,
          date: parse(fields.date, "dd/MM/yyyy", new Date()),
          content: fields.content,
        },
        select: {
          mainImage: true,
          images: true,
        },
      });

      if (oldMainFileToKeep === "" && post.mainImage !== null) {
        await prisma.postImage.delete({
          where: {
            postImgId: postId,
          },
        });
        const path = join(`${dir}`, `${post.mainImage.filename}`);
        deleteFile(path);
      }

      if (oldAlbumFilesToKeep.length === 0 && post.images.length > 0) {
        await prisma.postImage.deleteMany({
          where: {
            postAlbumId: postId,
          },
        });
        for (const image of post.images) {
          const path = join(`${dir}`, `${image.filename}`);
          deleteFile(path);
        }
      } else {
        for (const image of post.images) {
          if (!oldAlbumFilesToKeep.find((f) => f === image.filename)) {
            await prisma.postImage.delete({
              where: {
                id: Number(image.id),
              },
            });
            const path = join(`${dir}`, `${image.filename}`);
            deleteFile(path);
          }
        }
      }

      let albumImages: Enumerable<any> = [];

      for await (const file of files) {
        const path = join(`${dir}`, `${file.originalname}`);
        const fileInfo = await resizeAndSaveImage(file.buffer, path);
        if (file.fieldname === "mainFile") {
          await prisma.postImage.create({
            data: {
              filename: file.originalname,
              width: fileInfo.width,
              height: fileInfo.height,
              postImgId: postId,
            },
          });
        } else {
          albumImages.push({
            filename: file.originalname,
            width: fileInfo.width,
            height: fileInfo.height,
            postAlbumId: postId,
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
      return res.status(404).json({ error: `No post found.` });
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
