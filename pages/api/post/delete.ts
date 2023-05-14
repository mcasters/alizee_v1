import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";
// @ts-ignore
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type ResponseData = {
  data: string | null;
  error: string | null;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  /*
   *
   * Bug on delete method (no req.method = "delete") : wait for fix
   *
   */

  const body = req.body;

  const session = await getServerSession(req, res, authOptions);
  console.log(" session");
  console.log(session);
  if (req.method === "post") {
    console.log("method-delete : ", req.method);
    const id = body.id;
    console.log(id);
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    });
    console.log(post);
    res.json({ data: `${body.id}`, error: null });
  }
}
