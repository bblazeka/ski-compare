import React from "react";
import {
  AreaChart,
  Area,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DualAreaChartProps = {
  data: any[];
  unit: string;
  primaryProperty: string;
  secondaryProperty: string;
  primaryPropName: string;
  secondaryPropName: string;
  primaryPropColor?: string;
  secondaryPropColor?: string;
};

export default function DualAreaChart({
  data,
  unit,
  primaryProperty,
  secondaryProperty,
  primaryPropName,
  secondaryPropName,
  primaryPropColor = "#82ca9d",
  secondaryPropColor = "#8884d8",
}: DualAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 60, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={primaryPropColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={primaryPropColor} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={secondaryPropColor}
              stopOpacity={0.8}
            />
            <stop offset="95%" stopColor={secondaryPropColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="hours" unit="h" />
        <YAxis unit={unit} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={primaryProperty}
          name={primaryPropName}
          unit={unit}
          stroke={primaryPropColor}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey={secondaryProperty}
          name={secondaryPropName}
          unit={unit}
          stroke={secondaryPropColor}
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
