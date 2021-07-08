export function GetWeatherApi()
{
  // eslint-disable-next-line no-undef
  return process.env.WEATHER_API;
}

module.exports = { GetWeatherApi };