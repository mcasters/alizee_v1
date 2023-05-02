import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany();

  if (!posts) {
    res.status(400).send("Pas de posts");
  } else {
    res.status(200).json(posts);
  }
}
