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
  
  const dev = process.env.NODE_ENV !== 'production';

  const skiCategories = [{ key: 'easy', name: 'leicht', color: '#0088FE' }, { key: 'medium', name: 'mittel', color: '#D62728' }, { key: 'hard', name: 'schwer', color: '#FFFFF' }];

  var lat = 47.067936905855106;
  var long = 14.033547742358444;
  var weatherReq = await GetWeatherApi(lat, long);

  weatherReq.data.hourly.map((el: any, i: number) => {
    var date = new Date(el.dt * 1000);
    return Object.assign(el, {
      index: date.getHours()
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
      lifts: [
        { name: 'Schlepplifte', value: 5 },
        { name: 'Sessellifte', value: 4 },
        { name: 'Kabinenbahn', value: 3 },
        { name: 'Zauberteppiche', value: 1 }
      ],
      snow: '-',
      liftStatus: '3 von 15'
    }
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
    }
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
    }
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
    }
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
      lifts: [
        { name: 'Schlepplifte', value: 6 },
        { name: 'Sessellifte', value: 2 },
        { name: 'Seillifte', value: 1 },
        { name: 'Zauberteppiche', value: 1 }
      ],
      snow: '-',
      liftStatus: '3 von 15'
    }
  }];

  skiResorts = await Promise.all(skiResorts.map(async (el) => {
    if (dev) {
      return Object.assign(el, {
        weather: weatherReq.data
      });
    }
    else {
      var pistes = await scrap(el.key);
      var weather = (await GetWeatherApi(el.lat, el.long)).data;
      weather.hourly.map((el: any) => {
        var date = new Date(el.dt * 1000);
        return Object.assign(el, {
          index: date.getHours()
        })
      });
      return Object.assign(el, { 
        pistes, 
        weather  
      });
    }
  }));
  res.status(200).json({ skiResorts, skiCategories });
}