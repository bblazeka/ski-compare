// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import _ from 'lodash';
import { Category } from '../../common/types';
import { scrap } from '../../src/scrapper';
import { GetWeatherApi } from '../../src/fetcher';

type Data = {
  skiCategories: Category[]
  skiResorts: any[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const skiCategories = [{ name: 'easy', color: '#0088FE' }, { name: 'medium', color: '#D62728' }, { name: 'hard', color: '#FFFFF' }];

  var lat = 47.067936905855106;
  var long = 14.033547742358444;
  var weatherReq = await GetWeatherApi(lat, long);

  var currentTime = (new Date()).getHours();
  weatherReq.data.hourly.map((el: any, i: number) => {
    var time = (currentTime + i)%25;
    return Object.assign(el, {
      index: time
    })
  });

  var skiResorts = [{
    name: 'Kreischberg',
    lat: 47.067936905855106,
    long: 14.033547742358444,
    key: 'kreischberg',
    pistes: {
      easy: 17,
      medium: 16,
      hard: 9,
      rating: 4.4,
      count: '1.087',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: weatherReq.data
  },
  {
    name: 'Weinebene',
    lat: 46.841560462820716,
    long: 15.012484931548778,
    key: 'weinebene',
    pistes: {
      easy: 8,
      medium: 8,
      hard: 2,
      rating: 3.5,
      count: '1.279',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: weatherReq.data
  },
  {
    name: 'Klippitztörl',
    lat: 46.95380931856665,
    long: 14.685330031644156,
    key: 'klippitztoerl',
    pistes: {
      easy: 18,
      medium: 10,
      hard: 0,
      rating: 4,
      count: '3.394',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: weatherReq.data
  },
  {
    name: 'Lachtal', 
    lat: 47.25481438588727,
    long: 14.365432326564457,
    key: 'lachtal',
    pistes: {
      easy: 7,
      medium: 16,
      hard: 3,
      rating: 4.8,
      count: '751',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: weatherReq.data
  },
  {
    name: 'Turracher Höhe', 
    lat: 46.91441997836233,
    long: 13.87499425135462,
    key: 'turracherhoehe',
    pistes: {
      easy: 14.5,
      medium: 24,
      hard: 3.5,
      rating: 3.9,
      count: '1.975',
      lifts: [],
      snow: '-',
      liftStatus: '3 von 15'
    },
    weather: weatherReq.data
  }];

  skiResorts = await Promise.all(skiResorts.map(async (el) => {
    var obj = await scrap(el.key);
    //var weather = await GetWeatherApi(el.lat, el.long);
    return Object.assign(el, { pistes: obj,/* weather*/ });
  }));
  res.status(200).json({ skiResorts, skiCategories });
}