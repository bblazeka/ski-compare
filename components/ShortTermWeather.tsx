import React from 'react';
import Image from 'next/image';

type ShortTermWeatherProps = {
  data: any[]
}

export default function ShortTermWeather({ data }: ShortTermWeatherProps) {
  return (
    <div style={{ backgroundColor: 'lightblue', borderRadius: '5px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      {data.map((el: any, i: number) => {
        var date = new Date(el.dt * 1000);
        return (
          <div key={i}>
            <Image width={30} height={30} alt={el.weather[0].description} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} />
            <div>
              <span style={{ textAlign: 'center' }}>{date.toLocaleString("de", { weekday: "short" }).toUpperCase()}</span><br />
              <span style={{ margin: 'auto' }}>{date.getHours()}h</span>
            </div>
          </div>);
      })}
    </div>
  );
}