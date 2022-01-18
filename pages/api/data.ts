// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isNil } from "lodash";
import getConfig from "next/config";

import cache from "src/cache";
import { getTestData } from "src/data";
import { GetWeatherApi, GetDistance } from "src/fetcher";
import { scrap } from "src/scrapper";

import type { NextApiRequest, NextApiResponse } from "next";

type CachedNextApiRequest = NextApiRequest & { cache: any };

type Data = {
  skiResorts: TSkiResort[];
  lastUpdate: Date;
};

const {
  publicRuntimeConfig: { CACHE_MAX_AGE_IN_S },
} = getConfig();

export async function handler(
  req: CachedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const cacheKey = encodeURIComponent(req.url ?? "");

  if (!isNil(req.cache) && req.cache.has(cacheKey)) {
    const { data } = req.cache.get(cacheKey);
    res.setHeader("Cache-Control", `public,max-age=${CACHE_MAX_AGE_IN_S}`);
    res.setHeader("X-Cache", "HIT");

    return res.json(data);
  }

  let headers = {};
  let skiResorts = getTestData();
  const dev = process.env.NODE_ENV !== "production";

  const startLat = 47.069410857943055;
  const startLong = 15.439037603079603;
  if (dev) {
    const lat = 47.067936905855106;
    const long = 14.033647742358;
    const weatherReq = await GetWeatherApi(lat, long);
    const distanceRes = await GetDistance(startLat, startLong, lat, long);
    const distance =
      distanceRes.data.resourceSets[0].resources[0].travelDistance;
    const weatherData = weatherReq.data;

    weatherData.hourly = weatherData.hourly.map((el: any) => {
      const date = new Date(el.dt * 1000);
      return { ...el, hours: date.getHours() };
    });

    skiResorts = await Promise.all(
      skiResorts.map(async (el) => {
        return {
          ...el,
          weather: weatherReq.data,
          distance: distance + Math.round(Math.random() * 40),
        };
      })
    );
  } else {
    skiResorts = await Promise.all(
      skiResorts.map(async (el) => {
        const slopes = await scrap(el.key);
        const response = await GetWeatherApi(el.lat, el.long);
        const weather = response.data;
        const distanceRes = await GetDistance(
          startLat,
          startLong,
          el.lat,
          el.long
        );
        const distance =
          distanceRes.data.resourceSets[0].resources[0].travelDistance;
        headers = response.headers;
        weather.hourly = weather.hourly.map((el: any) => {
          const date = new Date(el.dt * 1000);
          return { ...el, hours: date.getHours() };
        });
        return { ...el, slopes, weather, distance };
      })
    );
  }

  const returnData = { skiResorts, lastUpdate: new Date() };
  if (!isNil(req.cache)) {
    req.cache.set(cacheKey, {
      headers,
      data: returnData,
    });
  }
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Cache", "MISS");

  res.status(200).json(returnData);
}

export default cache(handler);
