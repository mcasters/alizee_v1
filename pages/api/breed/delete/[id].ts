import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { deleteAllFiles, getHorsePath } from "@/utils/serverSideUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    const id = Number(req.query.id);

    const breedDeleted = await prisma.breed.findUnique({
      where: { id },
    });

    return breedDeleted
      ? res.status(200).redirect("/admin")
      : res.status(404).json({ error: `No breed found.` });
  } else {
    return res.status(401).send({ error: "Unauthorized" });
  }
}
