import React from "react";
import Image from "next/image";
import styles from "./ShortTermWeather.module.css";
import { CenteredDiv } from "src/common";

type ShortTermWeatherProps = {
  data: any[];
};

export default function ShortTermWeather({ data }: ShortTermWeatherProps) {
  return (
    <div className={styles.container}>
      {data.map((el: any, i: number) => {
        const imageUrl = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
        const date = new Date(el.dt * 1000);
        return (
          <div key={i}>
            <Image
              width={30}
              height={30}
              alt={el.weather[0].description}
              title={el.weather[0].description}
              src={imageUrl}
            />
            <div>
              <CenteredDiv>
                {date.toLocaleString("de", { weekday: "short" }).toUpperCase()}
              </CenteredDiv>
              <div className={styles.time}>{date.getHours()}h</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
