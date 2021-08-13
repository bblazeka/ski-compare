import React from 'react';
import Image from 'next/image';
import styles from './ShortTermWeather.module.css';

type ShortTermWeatherProps = {
  data: any[]
}

export default function ShortTermWeather({ data }: ShortTermWeatherProps) {
  return (
    <div className={styles.container}>
      {data.map((el: any, i: number) => {
        const date = new Date(el.dt * 1000);
        return (
          <div key={i}>
            <Image width={30} height={30} alt={el.weather[0].description} src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} />
            <div>
              <div className={styles.day}>{date.toLocaleString('de', { weekday: 'short' }).toUpperCase()}</div>
              <div className={styles.time}>{date.getHours()}h</div>
            </div>
          </div>);
      })}
    </div>
  );
}