import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const tags = await prisma.tag.findMany();
    return tags
      ? res.status(200).json(tags)
      : res.status(404).json({ message: `No tag found.` });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}
