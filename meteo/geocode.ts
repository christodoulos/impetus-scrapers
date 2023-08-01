import axios from "axios";

const GEOCODE_URL = "https://geocode.maps.co/search";

export async function getGeocode(text: string) {
  const url = `${GEOCODE_URL}?q=${text}&format=geojson`;
  const response = await axios.get(url);
  return response.data;
}
