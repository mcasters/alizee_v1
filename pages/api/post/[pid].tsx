import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(pid),
    },
  });

  return post
    ? res.status(200).json(post)
    : res.status(404).json({ message: `Post with id: ${pid} not found.` });
}
