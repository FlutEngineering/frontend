import { NextApiResponse, NextApiRequest } from "next";
import { FilebaseClient, File } from "@filebase/client";
import nc from "next-connect";
import multer from "multer";
import S3 from "aws-s3";

const client = new FilebaseClient({
  token: process.env.FILEBASE_API_KEY,
});

const handler = nc<NextApiRequest, NextApiResponse>({});

handler.get(async (req, res) => {
  // console.log("req =>", req);

  const bucket = await client.bucket;

  // console.log("bucket.list() =>", bucket.list());

  console.log("bucket =>", client);
  const config = {
    bucketName: "fluteaudio",
    region: "us-east-1",
    accessKeyId: "9721FB07814959F0742C",
    secretAccessKey: "5I5mvghn8WIY04di3PfLqCt0y4IPGJJTxAMeyM0T",
  };
  const S3Client = new S3(config);

  const response = await fetch(`https://api.filebase.com/storage/${bucket}`, {
    method: "GET",
  });

  return res.status(200).json({ bucket });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
