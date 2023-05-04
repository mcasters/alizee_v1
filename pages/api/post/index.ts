import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, date, content, published, images, tags } = req.body;
  const result = await prisma.post.create({
    data: {
      title,
      date,
      content,
      published,
      images,
      tags,
    },
  });
  return res.status(201).json(result);
}
