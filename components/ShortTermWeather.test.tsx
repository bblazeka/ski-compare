import React from 'react';
import { render } from '../testUtils';
import ShortTermWeather from './ShortTermWeather';

describe('ShortTermWeather', () => {

  it('displays value, title and subtitle', () => {
    const data = [{
      dt: 1627516800,
      temp: 6.88,
      feels_like: 5.45,
      pressure: 1019,
      humidity: 93,
      dew_point: 6.94,
      uvi: 0,
      clouds: 59,
      visibility: 10000,
      wind_speed: 2.12,
      wind_deg: 311,
      wind_gust: 1.87,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'Überwiegend bewölkt',
          icon: '04n'
        }
      ],
      pop: 0.77,
      index: 2
    },
    {
      dt: 1627524000,
      temp: 6.35,
      feels_like: 5.16,
      pressure: 1019,
      humidity: 90,
      dew_point: 5.91,
      uvi: 0,
      clouds: 0,
      visibility: 10000,
      wind_speed: 1.78,
      wind_deg: 300,
      wind_gust: 1.65,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'Klarer Himmel',
          icon: '01n'
        }
      ],
      pop: 0,
      index: 4
    },
    {
      dt: 1627574400,
      temp: 17.53,
      feels_like: 17.06,
      pressure: 1014,
      humidity: 66,
      dew_point: 12.07,
      uvi: 1.25,
      clouds: 65,
      visibility: 10000,
      wind_speed: 1.56,
      wind_deg: 145,
      wind_gust: 2.58,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'Leichter Regen',
          icon: '10d'
        }
      ],
      pop: 0.2,
      rain: { '1h': 0.13 },
      index: 18
    }];
    const { getByText } = render(<ShortTermWeather data={data} />, {});
    data.map((d) => {
      const date = new Date(d.dt * 1000);
      expect(getByText(`${date.getHours()}h`)).toBeInTheDocument();
    });
  });
});