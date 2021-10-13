import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { AxisDomain } from "recharts/types/util/types";
import { useTranslation } from "react-i18next";

import { CATEGORIES } from "config/preferences";
import { SkiContext } from "src/SkiContext";

type CompareMode = {
  id: number;
  name: string;
  unit: string;
  domain: AxisDomain;
  ticks: number[];
  renderBar: any;
};

function GetSlopesBars({ onClick }: any) {
  return CATEGORIES.map((cat: TCategory, i: number) => {
    return (
      <Bar
        key={i}
        dataKey={`slopes.${cat.key?.toLowerCase()}`}
        name={cat.name}
        unit="km"
        stackId="a"
        fill={cat.color}
        onClick={onClick}
      />
    );
  });
}

function GetRatingBars({ onClick }: any) {
  return (
    <Bar
      dataKey="slopes.rating"
      name="Bewertung"
      fill="#1976D2"
      onClick={onClick}
    />
  );
}

function GetElevationBars({ onClick }: any) {
  return [
    <Bar
      key={1}
      dataKey="slopes.bottomElevation"
      name=""
      stackId="a"
      fill="transparent"
      onClick={onClick}
    />,
    <Bar
      key={2}
      dataKey="slopes.topElevation"
      name="Elevation"
      stackId="a"
      fill="#1976D2"
      onClick={onClick}
    />,
  ];
}

export default function CompareChart() {
  const { t } = useTranslation();
  const [mode, setMode] = useState(0);

  const { visibleSkiResorts: skiResorts, setActiveSkiResort } =
    useContext(SkiContext);

  const barClickHandler = (_data: any, index: number) =>
    setActiveSkiResort(index);

  const modes: CompareMode[] = [
    {
      id: 0,
      name: t("SLOPES"),
      unit: "km",
      domain: [0, "auto"],
      ticks: [],
      renderBar: GetSlopesBars({ onClick: barClickHandler }),
    },
    {
      id: 1,
      name: t("RATING"),
      unit: "",
      domain: [0, 5],
      ticks: [0, 1, 2, 3, 4, 5],
      renderBar: GetRatingBars({ onClick: barClickHandler }),
    },
    {
      id: 2,
      name: "Höhe",
      unit: "m",
      domain: [1000, 3000],
      ticks: [],
      renderBar: GetElevationBars({ onClick: barClickHandler }),
    },
  ];

  const currentMode = modes[mode];

  return (
    <>
      <h3>{t("SKI_RESORT_COMPARISON")}</h3>
      <div style={{ width: "100%" }}>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {modes.map((el, index) => {
            return (
              <Button
                key={"button" + index}
                variant={mode === el.id ? "contained" : "outlined"}
                onClick={() => setMode(el.id)}
              >
                {el.name}
              </Button>
            );
          })}
        </ButtonGroup>
      </div>
      <div style={{ width: "100%", height: "30vh" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={skiResorts}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              unit={currentMode.unit}
              domain={currentMode.domain}
              ticks={currentMode.ticks}
            />
            <Tooltip />
            <Legend wrapperStyle={{ position: "relative" }} />
            {currentMode.renderBar}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
