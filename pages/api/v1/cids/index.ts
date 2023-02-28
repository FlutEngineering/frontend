import { NextApiResponse, NextApiRequest } from "next";
import { FilebaseClient, File } from "@filebase/client";
import nc from "next-connect";
import multer from "multer";

const client = new FilebaseClient({
  token: process.env.FILEBASE_API_KEY,
});

const handler = nc<NextApiRequest, NextApiResponse>({});

handler.get(async (req, res) => {
  console.log("req =>", req);

  const bucket = await client.bucket;

  console.log("bucket =>", bucket);

  // return res.status(200).json({ cid });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
