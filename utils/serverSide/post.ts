import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { mkdir, stat } from "fs";

export const parseFormData = async (
  req: NextApiRequest & { files?: any },
  res: NextApiResponse
) => {
  const storage = multer.memoryStorage();
  const multerUpload = multer({ storage });
  const multerFiles = multerUpload.any();
  await new Promise((resolve, reject) => {
    multerFiles(req as any, res as any, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
  return {
    fields: req.body,
    files: req.files,
  };
};

export const createPostDir = (postDir: string) => {
  stat(postDir, (err) => {
    if (err?.code === "ENOENT")
      mkdir(postDir, { recursive: true }, (err) => {
        throw err;
      });
    else {
      throw err;
    }
  });
};
