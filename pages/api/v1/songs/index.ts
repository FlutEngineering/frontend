import { NextApiResponse, NextApiRequest } from "next";
import nc from "next-connect";
import { S3 } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const accessKeyId = process.env.EVER_LAND_API_KEY as string;
const secretAccessKey = process.env.EVER_LAND_SECRET as string;
const bucketName = process.env.EVER_LAND_BUCKET_NAME as string;
const region = "us-west-2";

const client = new S3({
  endpoint: "https://endpoint.4everland.co",
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const handler = nc<NextApiRequest, NextApiResponse>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.get(async (req, res) => {
  // const { Buckets } = await client.listBuckets((err, data) => {
  //   console.log("data =>", data);
  //   return res.status(200).json({ yup: data });
  //   if (!err) {
  //     console.log(data);
  //   }
  // });
  // console.log("Buckets =>", Buckets);

  const objects = await client.listObjectsV2(
    { Bucket: bucketName, MaxKeys: 10 },
    (err, data) => {
      if (!err) {
        console.log(data.KeyCount);
        const contents = data.Contents.map((object) => {
          console.log("🎁 =>", object);
          return { name: object.Key, cid: object.ETag.replace(/"/g, "") };
        });
        console.log("contents =>", contents);
        return res.status(200).json({ songs: contents });
      }
    }
  );
  console.log("objects =>", objects);
});

export default handler;
