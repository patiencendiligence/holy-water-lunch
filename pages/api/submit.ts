import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

export const target = ["https://www.googleapis.com/auth/spreadsheets"]; // .readonly We will specify our target connection
export const jwt = new google.auth.JWT(
  process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
    /\\n/gm,
    "\n"
  ),
  target
);
export const sheets = google.sheets({ version: "v4", auth: jwt });

type SheetForm = {
  sort: string;
  name: string;
  menu: string;
  url: string;
  description: string;
  priceRate: string;
  type: string;
  imageUrl: string;
  isDisplayed: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req: ", req);
  if (req.method !== "POST") {
    return res.status(405).send({ message: "Only POST requests allowed" });
  }

  const body = req.body as SheetForm;

  try {
    // const auth = new google.auth.GoogleAuth({
    //   credentials: {
    //     client_email: process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_CLIENT_EMAIL,
    //     private_key:
    //       process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_PRIVATE_KEY?.replace(
    //         /\\n/g,
    //         "\n"
    //       ),
    //   },
    //   scopes: [
    //     "https://www.googleapis.com/auth/drive",
    //     "https://www.googleapis.com/auth/drive.file",
    //     "https://www.googleapis.com/auth/spreadsheets",
    //   ],
    // });

    // const sheets = google.sheets({
    //   auth,
    //   version: "v4",
    // });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_ENV_SPREADSHEET_ID,
      range: "ss!A2:H2",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            body.sort,
            body.name,
            body.menu,
            body.url,
            body.description,
            body.priceRate,
            body.type,
            body.imageUrl,
            false,
          ],
        ],
      },
    });
    console.log(response, "response");
    return res.status(201).json({
      data: response.data,
    });
  } catch (e: any) {
    return e
      ? res.status(e?.code).send({ message: e?.message })
      : console.log("ERROR");
  }
}
