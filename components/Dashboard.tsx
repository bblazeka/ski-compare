import React, { useMemo } from "react";
import styled from "styled-components";
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
import { useCurrentSkiResort } from "hooks/hooks";

const DashboardStyled = styled.div`
  width: 85%;
`;

const FullGraphContainer = styled.div`
  width: 100%;
  height: 40vh;
`;

const SmallGraphContainer = styled.div`
  width: 32%;
  minwidth: 400px;
  height: 30vh;
`;

export default function Dashboard() {
  const currentSkiResort = useCurrentSkiResort();
  const slopeDistribution = useMemo(
    () =>
      Object.entries(currentSkiResort?.slopes)
        .map(([key, value]) => {
          return { name: key, value };
        })
        .filter((el) => ["easy", "medium", "hard"].includes(el.name)),
    [currentSkiResort]
  );

  return (
    <DashboardStyled>
      <CompareChart />
      <TitleContainer resort={currentSkiResort} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <SmallGraphContainer>
          <ProgressIndicator
            title="Beliebt"
            status={{
              name: currentSkiResort.name,
              progress: currentSkiResort.slopes.rating,
              subtitle: currentSkiResort.slopes.count,
            }}
          />
        </SmallGraphContainer>
        <SmallGraphContainer>
          <CustomPieChart
            title="Pistenübersicht"
            distribution={slopeDistribution}
            manual={true}
          />
        </SmallGraphContainer>
        <SmallGraphContainer>
          <CustomPieChart
            title="Liftenübersicht"
            distribution={currentSkiResort.slopes.lifts}
            manual={false}
          />
        </SmallGraphContainer>
      </div>
      <h3>Wettervorhersage für die nächsten 7 Tage</h3>
      <LongTermWeather data={currentSkiResort.weather.daily} />
      <h3>Wettervorhersage für die nächsten 48 Stunden</h3>
      <ShortTermWeather data={currentSkiResort.weather.hourly} />
      <h3>Temperatur und Niederschlag in 48 Stunden</h3>
      <FullGraphContainer>
        <TempRainChart data={currentSkiResort.weather.hourly} />
      </FullGraphContainer>
      <h3>Wind in 48 Stunden</h3>
      <FullGraphContainer>
        <DualAreaChart
          data={currentSkiResort.weather.hourly}
          unit="m/s"
          primaryProperty="wind_speed"
          secondaryProperty="wind_gust"
          primaryPropName="Geschwindigkeit"
          secondaryPropName="Windböe"
        />
      </FullGraphContainer>
    </DashboardStyled>
  );
}
