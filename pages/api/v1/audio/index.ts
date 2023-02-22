import { NextApiResponse, NextApiRequest } from "next";
import { FilebaseClient, File } from "@filebase/client";
import nc from "next-connect";
import multer from "multer";

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

const client = new FilebaseClient({
  token: process.env.FILEBASE_API_KEY,
});

const handler = nc<
  NextApiRequest & { file: Express.Multer.File },
  NextApiResponse
>({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(uploadMiddleware);

// handler.get((req, res) => {
//   return res.status(200).json({ get: true });
// });

handler.post(async (req, res) => {
  console.log("req =>", req);
  console.log("req.file =>", req.file);
  const { file } = req;

  if (!file) {
    res.status(400).json({ error: "Audio is required" });
  }

  if (!mimetypes.includes(file.mimetype)) {
    res.status(415).json({ error: `${file.mimetype} is not supported` });
  }

  const cid = await client.storeBlob(
    new File([file.buffer], file.originalname, { type: file.mimetype })
  );

  console.log("cid =>", cid);

  console.log("yay");
  return res.status(200).json({ cid });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
