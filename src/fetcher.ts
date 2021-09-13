import axios from "axios";

export async function GetWeatherApi(lat: number, long: number) {
  // eslint-disable-next-line no-undef
  return await axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=de&appid=${process.env.WEATHER_API}`
  );
}

export async function GetDistance(
  startLat: number,
  startLong: number,
  endLat: number,
  endLong: number
) {
  return await axios.get(
    `http://dev.virtualearth.net/REST/V1/Routes?wp.0=${startLat},${startLong}&wp.1=${endLat},${endLong}&key=${process.env.MAP_API}`
  );
}

module.exports = { GetWeatherApi, GetDistance };
