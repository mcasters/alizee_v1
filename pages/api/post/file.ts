import { NextApiRequest, NextApiResponse } from "next";

import { parseFormData } from "@/utils_server/imageUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { fields, files } = await parseFormData(req);

    console.log("{ fields, files } : ///");
    console.log({ fields, files });

    res.status(200).json({
      data: "ok",
      error: null,
    });
  } catch (e) {
    console.error("error :");
    console.error(e);
    res.status(500).json({ data: null, error: "Internal Server Error" });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
