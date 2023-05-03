import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: Number(pid) },
      });
      res.status(200).json(post);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    const post = await prisma.post.findUnique({
      where: { id: Number(pid) },
    });

    return post
      ? res.status(200).json(post)
      : res.status(404).json({ message: `Post with id: ${pid} not found.` });
  }
}
