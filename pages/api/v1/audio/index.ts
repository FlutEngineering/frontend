import { NextApiResponse, NextApiRequest } from "next";
// import { FilebaseClient, File } from "@filebase/client";
import nc from "next-connect";
import multer from "multer";
import { S3 } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
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

const mimetypes = [
  "audio/aac",
  "audio/mpeg",
  "audio/ogg",
  "audio/opus",
  "audio/wav",
  "audio/webm",
];

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024, // 20mb
  },
});

const uploadMiddleware = upload.single("audio");

const handler = nc<
  // NextApiRequest & { file: Express.Multer.File },
  NextApiRequest & { file: File },
  NextApiResponse
>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(uploadMiddleware);

handler.post(async (req, res) => {
  const { file } = req;
  console.log("file =>", file);

  if (!file) {
    res.status(400).json({ error: "Audio is required" });
  }

  if (!mimetypes.includes(file.mimetype)) {
    res.status(415).json({ error: `${file.mimetype} is not supported` });
  }
  try {
    const params = {
      Bucket: bucketName,
      Key: file.originalname || "fluff",
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const task = new Upload({
      client,
      queueSize: 3, // 3 MiB
      params,
    });
    task.on("httpUploadProgress", (e) => {
      const progress = ((e.loaded! / e.total!) * 100) | 0;
      console.log("progress", progress);
      // onProgress?.(progress);
    });
    await task.done();
    const result = await client.headObject(params);
    const metadata = result.Metadata;
    console.log({
      url: `ipfs://${metadata?.["ipfs-hash"]}`,
      type: file.type || "image/jpeg",
    });
    return res.status(200).json({ cid: metadata?.["ipfs-hash"] });
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
