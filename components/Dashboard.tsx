import React, { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  CompareChart,
  CustomPieChart,
  DualAreaChart,
  LongTermWeather,
  ProgressIndicator,
  ShortTermWeather,
  TempRainChart,
  TitleContainer,
} from "components";
import { useCurrentSkiResort } from "src/hooks";
import Strings from "src/strings";

const useStyles = makeStyles({
  dashboard: {
    width: "85%",
  },
  fullGraph: {
    width: "100%",
    height: "40vh",
  },
  smallGraph: {
    width: "32%",
    minWidth: "400px",
    height: "30vh",
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const currentSkiResort = useCurrentSkiResort();
  const slopeDistribution = useMemo(
    () =>
      Object.entries(currentSkiResort?.slopes)
        .map(([key, value]) => {
          return { id: key, name: key, value: value as number };
        })
        .filter((el) => ["easy", "medium", "hard"].includes(el.name)),
    [currentSkiResort]
  );

  return (
    <div className={classes.dashboard}>
      <CompareChart />
      <TitleContainer resort={currentSkiResort} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div className={classes.smallGraph}>
          <ProgressIndicator
            title={Strings.POPULARITY}
            status={{
              name: currentSkiResort.name,
              progress: currentSkiResort.slopes.rating,
              subtitle: currentSkiResort.slopes.ratingsCount,
            }}
          />
        </div>
        <div className={classes.smallGraph}>
          <CustomPieChart
            title={Strings.SKI_SLOPES_OVERVIEW}
            distribution={slopeDistribution}
          />
        </div>
        <div className={classes.smallGraph}>
          <CustomPieChart
            title={Strings.SKI_LIFT_OVERVIEW}
            distribution={currentSkiResort.slopes.lifts}
          />
        </div>
      </div>
      <h3>{Strings.WEATHER_FORECAST_FOR_NEXT_7_DAYS}</h3>
      <LongTermWeather data={currentSkiResort.weather.daily} />
      <h3>{Strings.WEATHER_FORECAST_FOR_NEXT_48_HOURS}</h3>
      <ShortTermWeather data={currentSkiResort.weather.hourly} />
      <h3>{Strings.TEMPERATURE_AND_PERCIPITAION_IN_NEXT_48_HOURS}</h3>
      <div className={classes.fullGraph}>
        <TempRainChart data={currentSkiResort.weather.hourly} />
      </div>
      <h3>{Strings.WIND_IN_48_HOURS}</h3>
      <div className={classes.fullGraph}>
        <DualAreaChart
          data={currentSkiResort.weather.hourly}
          unit="m/s"
          primaryProperty="wind_speed"
          secondaryProperty="wind_gust"
          primaryPropName="Geschwindigkeit"
          secondaryPropName="Windböe"
        />
      </div>
    </div>
  );
}
