import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;
  const session = await getServerSession(req, res, authOptions);
  console.log(pid);

  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.post.delete({
        where: { id: Number(pid) },
      });
      return res.redirect(200, "/admin");
    } else {
      return res.status(401).send({ message: "Unauthorized" });
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
