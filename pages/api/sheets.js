import { google } from "googleapis";

export const target = ["https://www.googleapis.com/auth/spreadsheets"]; // .readonly We will specify our target connection
export const jwt = new google.auth.JWT(
  process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_CLIENT_EMAIL,
  null,
  (process.env.NEXT_PUBLIC_ENV_GOOGLE_SHEETS_PRIVATE_KEY || "").replace(
    /\\n/gm,
    "\n"
  ),
  target
);
export const sheets = google.sheets({ version: "v4", auth: jwt });

export async function addLunchList(sendData, callback) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.NEXT_PUBLIC_ENV_SPREADSHEET_ID,
      range: "ss",
      includeValuesInResponse: callback,
      requestBody: {
        values: sendData,
      },
    });
    console.log(response, "response");
    const rows = response.data.values;
    if (rows.length) {
      console.log(rows, "response");
      return rows.map((row) => ({
        sort: row[0] ?? "",
        name: row[1] ?? "",
        menu: row[2] ?? "",
        url: row[3] ?? "",
        description: row[4] ?? "",
        priceRate: row[5] ?? "",
        type: row[6] ?? "",
        imageUrl: row[7] ?? "",
      }));
      // .filter((index) => index !== 0);
    }
  } catch (err) {
    console.log("ERROR:", err);
    return;
  }
}
export async function getLunchList() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_ENV_SPREADSHEET_ID,
      range: "ss", // sheet name
    });

    const rows = response.data.values;
    if (rows.length) {
      console.log(rows, "response");
      return rows
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
        }))
        .filter((row, index) => row && index > 0);
    }
  } catch (err) {
    console.log("ERROR:", err);
  }
  return [];
}
