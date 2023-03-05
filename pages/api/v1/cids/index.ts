import { NextApiResponse, NextApiRequest } from "next";
import { FilebaseClient, File } from "@filebase/client";
import nc from "next-connect";
import { S3 } from "@aws-sdk/client-s3";

const s3 = new S3({
  endpoint: "https://endpoint.4everland.co",
  // signatureVersion: "v4",
  credentials: {
    accessKeyId: process.env.EVER_LAND_API_KEY,
    secretAccessKey: process.env.EVER_LAND_SECRET,
    // sessionToken,
  },
  region: "us-west-2",
});

const handler = nc<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.get(async (req, res) => {
  const { Buckets } = await s3.listBuckets((err, data) => {
    console.log("data =>", data);
    return res.status(200).json({ yup: data });
    if (!err) {
      console.log(data);
    }
  });
  console.log("Buckets =>", Buckets);

  const objects = await s3.listObjectsV2(
    { Bucket: Buckets[0].Name, MaxKeys: 10 },
    (err, data) => {
      if (!err) {
        console.log(data.KeyCount);
        const contents = data.Contents.forEach((object) => {
          console.log("🎁 =>", object);
          return object;
        });
        return contents;
      }
    }
  );
  console.log("objects =>", objects);
  return res.status(200).json({ yup: "yup" });
});

export default handler;
