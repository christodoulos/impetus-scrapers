import { booleanPointInPolygon as pointInPolygon, point } from "@turf/turf";
import { AtticaStations } from "./models";
import { saveGeoLocatedStations, findAllStations } from "./mongo_utils";
import {
  scrapMeteoHtmlString,
  scrapEx1Station,
  scrapEx2Station,
  stationType,
} from "./scrapers";
import { meteoHtmlString, nuts30, sleep } from "./util";
import { getGeocode } from "./geocode";
import axios from "axios";

async function geoLocate(hrefs: AtticaStations) {
  for (let i = 0; i < hrefs.length; i++) {
    const station = hrefs[i];
    // console.log(station.text);
    const data = await getGeocode(station.text);
    for (const feature of data.features) {
      const { geometry } = feature;
      const spoint = point(geometry.coordinates);
      if (pointInPolygon(spoint, nuts30.features[0])) {
        // console.log(spoint);
        hrefs[i].geometry = geometry;
        break;
      }
    }
    await sleep(500); // Do not abuse the geocode service
  }
}

async function main() {
  const hrefs = scrapMeteoHtmlString(meteoHtmlString);
  console.log(hrefs, hrefs.length);
  await geoLocate(hrefs);
  await saveGeoLocatedStations(hrefs);
}

// main();

// axios.get("http://www.meteo.gr/stations/chaidari/").then((response) => {
//   console.log(stationType(response.data));
//   console.log(scrapEx1Station(response.data));
// });

// axios.get("http://likovrisi.meteoclub.gr/").then((response) => {
//   console.log(stationType(response.data));
//   console.log(scrapEx2Station(response.data));
// });

const userAgents = [
  // Chrome on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  // Firefox on macOS
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Firefox/45.0",
  // Safari on iOS
  "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1",
  // Edge on Windows
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134",
  // Opera on macOS
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36 OPR/63.0.3368.53",
  // Internet Explorer on Windows
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
];

const randomUserAgent =
  userAgents[Math.floor(Math.random() * userAgents.length)];

findAllStations().then(async (results) => {
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(result.href);
    axios
      .get(result.href, {
        headers: {
          "User-Agent": randomUserAgent,
        },
      })
      .then((response) => {
        const html = response.data;
        if (stationType(html)) {
          console.log(scrapEx2Station(html));
        } else {
          console.log(scrapEx1Station(html));
        }
      });
    await sleep(2000);
  }
});
