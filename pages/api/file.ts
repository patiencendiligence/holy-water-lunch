import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export const target = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
]; // .readonly We will specify our target connection
export const jwt = new google.auth.JWT(
  process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
    /\\n/gm,
    "\n"
  ),
  target
);
// /upload/drive/v3/files?uploadType=media
export const drive = google.drive({ version: "v3", auth: jwt });
export type DriveFile = {
  kind: string;
  id: string;
  name: string;
  mimeType: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({
      data: null,
      error: "Method Not Allowed",
    });
    return;
  }
  console.log(req, "req");
  const sendData = req.body as DriveFile;

  const fileMetadata = {
    name: "my-image.jpg",
    parents: ["1z9MxLIGWZVQ9uFag6QFLsN5oTyV8pjDr"],
    hasThumbnail: true,
    mimeType: "image/jpeg",
  };
  const media = {
    mimeType: "image/jpeg",
    body: sendData,
  };
  try {
    const file = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    console.log("File:", file);
    if (file && file.data && file.data.id) {
      console.log("File Id:", file.data.id);
      return file.data?.id;
    } else {
      console.log("ERROR!");
    }
  } catch (err) {
    // TODO(developer) - Handle error
    console.log(err, "ERROR");
  }
}
