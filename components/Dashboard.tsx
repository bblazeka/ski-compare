import React, { useContext } from "react";
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
import { SkiContext } from "context/SkiContext";

type DashboardProps = {};

export default function Dashboard(props: DashboardProps) {
  const { skiResorts, activeSkiResort } = useContext(SkiContext);

  const currentSkiResort = skiResorts[activeSkiResort];
  const slopeDistribution = Object.entries(currentSkiResort.slopes)
    .map(([key, value]) => {
      return { name: key, value };
    })
    .filter((el) => ["easy", "medium", "hard"].includes(el.name));

  return (
    <div style={{ width: "85%" }}>
      <CompareChart />
      <TitleContainer resort={currentSkiResort} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ width: "32%", minWidth: "400px", height: "30vh" }}>
          <ProgressIndicator
            title="Beliebt"
            status={{
              name: currentSkiResort.name,
              progress: currentSkiResort.slopes.rating,
              subtitle: currentSkiResort.slopes.count,
            }}
          />
        </div>
        <div style={{ width: "32%", minWidth: "400px", height: "30vh" }}>
          <CustomPieChart
            title="Pistenübersicht"
            distribution={slopeDistribution}
            manual={true}
          />
        </div>
        <div style={{ width: "32%", minWidth: "400px", height: "30vh" }}>
          <CustomPieChart
            title="Liftenübersicht"
            distribution={currentSkiResort.slopes.lifts}
            manual={false}
          />
        </div>
      </div>
      <h3>Wettervorhersage für die nächsten 7 Tage</h3>
      <LongTermWeather data={currentSkiResort.weather.daily} />
      <h3>Wettervorhersage für die nächsten 48 Stunden</h3>
      <ShortTermWeather data={currentSkiResort.weather.hourly} />
      <h3>Temperatur und Niederschlag in 48 Stunden</h3>
      <div style={{ width: "100%", height: "40vh" }}>
        <TempRainChart data={currentSkiResort.weather.hourly} />
      </div>
      <h3>Wind in 48 Stunden</h3>
      <div style={{ width: "100%", height: "40vh" }}>
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
