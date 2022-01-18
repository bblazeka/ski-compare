import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { WeatherBadge } from "components";
import { CenteredDiv } from "src/common";

type LongTermWeatherProps = {
  data: any[];
};

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dailyContainer: {
    display: "flex",
    marginLeft: "20px",
    marginBottom: "10px",
  },
  weatherContainer: {
    display: "flex",
    flexDirection: "column",
  },
});

export default function LongTermWeather({ data }: LongTermWeatherProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {data.map((el: any, index: number) => {
        const date = new Date(el.dt * 1000);
        const month = date
          .toLocaleString("de", { month: "short" })
          .toUpperCase();
        return (
          <div className={classes.dailyContainer} key={`ltweather-${index}`}>
            <div style={{ marginRight: "2px" }}>
              <CenteredDiv>{month}</CenteredDiv>
              <div style={{ margin: "auto", textAlign: "center" }}>
                {date.getDate()}
              </div>
            </div>
            <WeatherBadge
              description={el.weather[0].description}
              icon={el.weather[0].icon}
            />
            <div className={classes.weatherContainer}>
              <span>{`${Math.round(el.temp.day)} °C`}</span>
              <span style={{ fontSize: "0.9em" }}>{`${Math.round(
                el.feels_like.day
              )} °C`}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
