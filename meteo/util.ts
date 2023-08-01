import { readFileSync } from "fs";
import { join } from "path";
import * as moment from "moment-timezone";

let filePath = join(process.cwd(), "meteo/attica_stations.html");
export const meteoHtmlString = readFileSync(filePath, "utf8");

filePath = join(process.cwd(), "meteo/nuts30.geojson");
const data = readFileSync(filePath, "utf8");
export const nuts30 = JSON.parse(data);

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function meteoDate1(sdate: string) {
  const format = "DD/MM/YYYY HH:mm";
  const timeZone = "Europe/Athens";
  const date = moment.tz(sdate, format, timeZone).toDate();
  return date;
}

export function meteoDate2(sdate: string) {
  const format = "DD/MM/YY HH:mm";
  const timeZone = "Europe/Athens";
  const date = moment.tz(sdate, format, timeZone).toDate();
  return date;
}
