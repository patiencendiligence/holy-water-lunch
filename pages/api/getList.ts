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

// 메모리 캐시
let cachedData: any = null;
let cacheTime: number = 0;
const CACHE_DURATION = 60 * 1000; // 60초 캐시

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 캐시 체크
  if (cachedData && Date.now() - cacheTime < CACHE_DURATION) {
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    return res.status(200).json({ data: cachedData, cached: true });
  }

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
      
      // 캐시 저장
      cachedData = setRows;
      cacheTime = Date.now();
      
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      return res.status(200).json({
        data: setRows,
      });
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
  return [];
}
