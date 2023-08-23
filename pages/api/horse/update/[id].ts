import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = req.query.id;

    const horse = await prisma.horse.update({
      data: { id: Number(id) },
    });
    return horse
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No horse found.` });
  } else {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
