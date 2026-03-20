import { google } from "googleapis";
import { LunchType } from "@/components/common/types";

const target = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const jwt = new google.auth.JWT(
  process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_CLIENT_EMAIL,
  undefined,
  (process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_PRIVATE_KEY || "").replace(/\\n/gm, "\n"),
  target
);
const sheets = google.sheets({ version: "v4", auth: jwt });

export async function getLunchData(type?: string): Promise<LunchType[]> {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.NEXT_PUBLIC_ENV_SPREADSHEET_ID,
    range: "ss",
  });

  const rows = response.data.values;
  if (!rows?.length) return [];

  const data = rows
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
    .filter((_, index) => index > 0);

  return type ? data.filter((i) => i.type === type) : data;
}
