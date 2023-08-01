import { load } from "cheerio";
import { AtticaStations } from "./models";
import { meteoDate1, meteoDate2 } from "./util";

export function scrapMeteoHtmlString(html: string) {
  const hrefs: AtticaStations = [];
  const $ = load(html);
  const tdElements = $("td.innerTableCell.stationHead");

  tdElements.each((i, td) => {
    const aElement = $(td).find("a");
    const text = aElement.text();
    if (aElement.length > 0) {
      const href = aElement.attr("href") ?? "";
      hrefs.push({ text, href });
    }
  });
  return hrefs;
}

// for stations like http://www.meteo.gr/stations/chaidari/
export function scrapEx1Station(html: string) {
  const $ = load(html);
  const data: { [key: string]: any } = {};

  // elevation
  let text = $(".header_right_col span:last-child").text();
  const match = text.match(/(\d+)\s*(\w+)/);
  const height = match !== null ? parseInt(match[1]) : null;
  const unit = match !== null ? match[2] : null;
  data["elevation"] = { height, unit };

  // timestamp
  text = $(
    ".col_sub.dist.boxshadow.realtime .headline.gradient span:last-child"
  ).text();
  const timestamp = meteoDate1(text);
  data["timestamp"] = timestamp;

  // all other realtime data
  $(".col_sub.dist.boxshadow.realtime .line").each((i, line) => {
    const text = $(line).find(".lleft span:first-child").text();
    const label = text.toLowerCase().replace(/[^a-z0-9]+/gi, "_");
    const metric = $(line).find(".lright span:last-child").text();
    if (label === "wind") {
      const match = metric.match(/([\d.]+)\s(.+)\sat\s(.+)/);
      if (match) {
        const [value, unit, direction] = [match[1], match[2], match[3]];
        data[label] = { value, unit, direction };
      }
    } else {
      const match = metric.match(/([\d.]+)\s(.+)/);
      if (match) {
        const [value, unit] = [match[1], match[2]];
        data[label] = { value, unit };
      }
    }
  });

  return data;
}

// for stations like http://meteoclima.hua.gr/stations/salamina/
export function scrapEx2Station(html: string) {
  const $ = load(html);
  const data: { [key: string]: any } = {};

  // elevation
  const elevationText = $('b:contains("Elevation")').parent().text();
  const height = elevationText.match(/(\d+)/);
  const unit = elevationText.match(/[^\d\s]+$/);
  if (height && unit) {
    data["elevation"] = { height: height[0], unit: unit[0] };
  }

  // timestamp
  const timestampText = $('big:contains("Current Weather")').parent().text();
  const time = timestampText.match(/\d{1,2}:\d{2}/);
  const date = timestampText.match(/\d{2}\/\d{2}\/\d{2}/);
  if (time && date) {
    const timedate = `${date[0]} ${time[0]}`;
    const timestamp = meteoDate2(timedate);
    data["timestamp"] = timestamp;
  }

  // temperature
  const temperatureText = $('td:contains("Temperature")').next().text();
  const temperatureValue = temperatureText.match(/[\d.]+/);
  // const temperatureUnit = temperatureText.match(/[^\d.\s]+$/);
  if (temperatureValue) {
    data["temperature"] = {
      value: temperatureValue[0],
      unit: "°C", // hardcoded due to weird characters
    };
  }

  // humidity
  const humidityText = $('td:contains("Humidity")').next().text();
  const humidityValue = humidityText.match(/[\d.]+/);
  // const humidityUnit = humidityText.match(/[^\d.\s]+$/);
  if (humidityValue) {
    data["humidity"] = {
      value: humidityValue[0],
      unit: "%", // hardcoded due to weird characters
    };
  }

  // Dewpoint
  const dewpointText = $('td:contains("Dewpoint")').next().text();
  const dewpointValue = dewpointText.match(/[\d.]+/);
  // const dewpointUnit = dewpointText.match(/[^\d.\s]+$/);
  if (dewpointValue) {
    data["dewpoint"] = {
      value: dewpointValue[0],
      unit: "°C", // hardcoded due to weird characters
    };
  }

  // Wind
  const windText = $('td:contains("Wind")').next().text();
  const windValue = windText.match(/[\d.]+/);
  const windUnit = windText.match(/[\w/]+(?=\s+at)/);
  const windDirection = windText.match(/\b[A-Z]{1,3}\b/);
  if (windValue && windUnit && windDirection) {
    data["wind"] = {
      value: windValue[0],
      unit: windUnit[0],
      direction: windDirection[0],
    };
  }

  // Barometer
  const barometerText = $('td:contains("Barometer")').next().text();
  const barometerValue = barometerText.match(/[\d.]+/);
  const barometerUnit = "hPa"; // hardcoded due to weird characters
  if (barometerValue) {
    data["barometer"] = {
      value: barometerValue[0],
      unit: barometerUnit,
    };
  }

  // Today's Rain
  const rainText = $('td:contains("Today\'s Rain")').next().text();
  const rainValue = rainText.match(/[\d.]+/);
  const rainUnit = "mm"; // hardcoded due to weird characters
  if (rainValue) {
    data["today_s_rain"] = {
      value: rainValue[0],
      unit: rainUnit,
    };
  }

  // Rain Rate
  const rainRateText = $('td:contains("Rain Rate")').next().text();
  const rainRateValue = rainRateText.match(/[\d.]+/);
  const rainRateUnit = "mm/hr"; // hardcoded due to weird characters
  if (rainRateValue) {
    data["rain_rate"] = {
      value: rainRateValue[0],
      unit: rainRateUnit,
    };
  }

  // Storm Total
  const stormTotalText = $('td:contains("Storm Total")').next().text();
  const stormTotalValue = stormTotalText.match(/[\d.]+/);
  const stormTotalUnit = "mm"; // hardcoded due to weird characters
  if (stormTotalValue) {
    data["storm_total"] = {
      value: stormTotalValue[0],
      unit: stormTotalUnit,
    };
  }

  // Monthly Rain
  const monthlyRainText = $('td:contains("Monthly Rain")').next().text();
  const monthlyRainValue = monthlyRainText.match(/[\d.]+/);
  const monthlyRainUnit = "mm"; // hardcoded due to weird characters
  if (monthlyRainValue) {
    data["monthly_rain"] = {
      value: monthlyRainValue[0],
      unit: monthlyRainUnit,
    };
  }

  // Yearly Rain
  const yearlyRainText = $('td:contains("Yearly Rain")').next().text();
  const yearlyRainValue = yearlyRainText.match(/[\d.]+/);
  const yearlyRainUnit = "mm"; // hardcoded due to weird characters
  if (yearlyRainValue) {
    data["yearly_rain"] = {
      value: yearlyRainValue[0],
      unit: yearlyRainUnit,
    };
  }

  // Wind Chill
  const windChillText = $('td:contains("Wind Chill")').next().text();
  const windChillValue = windChillText.match(/[\d.]+/);
  const windChillUnit = "°C"; // hardcoded due to weird characters
  if (windChillValue) {
    data["wind_chill"] = {
      value: windChillValue[0],
      unit: windChillUnit,
    };
  }

  // Heat Index
  const heatIndexText = $('td:contains("Heat Index")').next().text();
  const heatIndexValue = heatIndexText.match(/[\d.]+/);
  const heatIndexUnit = "°C"; // hardcoded due to weird characters
  if (heatIndexValue) {
    data["heat_index"] = {
      value: heatIndexValue[0],
      unit: heatIndexUnit,
    };
  }

  return data;
}

export function stationType(html: string) {
  const $ = load(html);
  const eaa = $('td:contains("N.O.A.\'s Network")').text();
  return eaa ? true : false;
}
