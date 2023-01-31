import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_ENV_SPREADSHEET_ID,
      range: "ss", // sheet name
    });

    const rows = response.data.values;
    if (rows && rows.length) {
      console.log(rows, "row");
      const setRows = rows
        .map((row, index) => ({
          id: index,
          sort: row[0] ?? "",
          name: row[1] ?? "",
          menu: row[2] ?? "",
          url: row[3] ?? "",
          description: row[4] ?? "",
          priceRate: row[5] ?? 0,
          type: row[6] ?? "",
          imageUrl: row[7] ?? "",
          isDisplayed: row[8] ?? false,
        }))
        .filter((row, index) => row && index > 0);
      return res.status(201).json({
        data: setRows,
      });
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
  return [];
}
