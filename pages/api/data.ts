// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import _ from "lodash";
import { scrap } from "src/scrapper";
import { GetWeatherApi, GetDistance } from "src/fetcher";
import { getTestData } from "src/data";
import cache from "src/cache";
import getConfig from "next/config";

type CachedNextApiRequest = NextApiRequest & { cache: any };

type Data = {
  skiResorts: SkiResort[];
};

const {
  publicRuntimeConfig: { CACHE_MAX_AGE_IN_S },
} = getConfig();

export async function handler(
  req: CachedNextApiRequest,
  res: NextApiResponse<Data>
) {
  const cacheKey = encodeURIComponent(req.url ?? "");

  if (!_.isNil(req.cache) && req.cache.has(cacheKey)) {
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
    const long = 14.033547742358444;
    const weatherReq = await GetWeatherApi(lat, long);
    const distanceRes = await GetDistance(startLat, startLong, lat, long);
    const distance =
      distanceRes.data.resourceSets[0].resources[0].travelDistance;
    const weatherData = weatherReq.data;

    weatherData.hourly.map((el: any) => {
      const date = new Date(el.dt * 1000);
      return { ...el, index: date.getHours() };
    });

    skiResorts = await Promise.all(
      skiResorts.map(async (el) => {
        return { ...el, weather: weatherReq.data, distance };
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
        weather.hourly.map((el: any) => {
          const date = new Date(el.dt * 1000);
          return { ...el, index: date.getHours() };
        });
        return { ...el, slopes, weather, distance };
      })
    );
  }

  if (!_.isNil(req.cache)) {
    req.cache.set(cacheKey, {
      headers,
      data: skiResorts,
    });
  }
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("X-Cache", "MISS");

  res.status(200).json({ skiResorts });
}

export default cache(handler);
