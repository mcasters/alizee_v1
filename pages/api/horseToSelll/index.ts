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
    const horses = await prisma.horseToSell.findMany({
      include: {
        mainImage: {
          select: { filename: true },
        },
        images: {
          select: { filename: true },
        },
      },
    });
    return horses
      ? res.status(200).json(horses)
      : res.status(404).json({ message: `No horseToSell found.` });
  } else {
    return res.status(401).send({ message: "Unauthorized" });
  }
}
