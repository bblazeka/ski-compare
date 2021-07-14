import React from 'react';
import Image from 'next/image';

type ShortTermWeatherProps = {
  data: any[]
}

export default function ShortTermWeather({ data }: ShortTermWeatherProps) {
  return (
    <div style={{ backgroundColor: 'skyblue', borderRadius: '5px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', padding: '0 2vw 0 2vw' }}>
      {data.map((el: any, i: number) => {
        var date = new Date(el.dt * 1000);
        return (
          <div key={i}>
            <Image width={30} height={30} alt={el.weather[0].description} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} />
            <div>
              <div style={{ textAlign: 'center' }}>{date.toLocaleString("de", { weekday: "short" }).toUpperCase()}</div>
              <div style={{ textAlign: 'center', margin: 'auto', fontSize: '0.75em' }}>{date.getHours()}h</div>
            </div>
          </div>);
      })}
    </div>
  );
}