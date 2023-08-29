import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    const breeds = await prisma.breed.findMany();
    return breeds
      ? res.status(200).json(breeds)
      : res.status(404).json({ message: `No breed found.` });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}
