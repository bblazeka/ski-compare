import React, { useMemo } from "react";
import {
  Bar,
  ComposedChart,
  Line,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TempRainChartProps = {
  data: any[];
};

export default function TempRainChart({ data }: TempRainChartProps) {
  const [min, max] = useMemo(
    () => [
      Math.min(
        ...data.map((el) => el.temp),
        ...data.map((el) => el.feels_like)
      ),
      Math.max(
        ...data.map((el) => el.temp),
        ...data.map((el) => el.feels_like)
      ),
    ],
    [data]
  );
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 10, right: -10, left: -10, bottom: 0 }}
      >
        <XAxis dataKey="hours" unit="h" />
        <YAxis
          yAxisId="left"
          type="number"
          dataKey="temp"
          unit="°C"
          domain={[Math.round(min - 1), Math.round(max + 1)]}
        />
        <YAxis
          yAxisId="right"
          type="number"
          orientation="right"
          domain={["auto", 8]}
          unit="mm"
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="right"
          dataKey="rain.1h"
          stackId="a"
          name="Regen"
          unit="mm/h"
          fill="#3182BD"
        />
        <Bar
          yAxisId="right"
          dataKey="snow.1h"
          stackId="a"
          name="Schnee"
          unit="mm/h"
          fill="#0088FE"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temp"
          name="Ist"
          unit="°C"
          stroke="#8884d8"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="feels_like"
          name="Gefühlte"
          unit="°C"
          stroke="#82ca9d"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
