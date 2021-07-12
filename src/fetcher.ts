import axios from 'axios';

export async function GetWeatherApi(lat: number, long: number)
{
  // eslint-disable-next-line no-undef
  return await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&lang=de&appid=${process.env.WEATHER_API}`);
}

module.exports = { GetWeatherApi };