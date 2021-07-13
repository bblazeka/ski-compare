import React from 'react';
import { Bar, ComposedChart, Line, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

type TempRainChartProps = {
  data: any[]
}

export default function TempRainChart({ data }: TempRainChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
    <ComposedChart width={730} height={250} data={data}>
      <XAxis dataKey="index" unit="h" />
      <YAxis yAxisId="left" type="number" dataKey="temp" unit="°C" />
      <YAxis yAxisId="right" type="number" orientation="right" domain={['auto', 8]} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Bar yAxisId="right" dataKey="rain.1h" stackId="a" name='Regen' unit='mm/h' fill="#3182BD" />
      <Bar yAxisId="right" dataKey="snow.1h" stackId="a" name='Schnee' unit='mm/h' fill="#0088FE" />
      <Line yAxisId="left" type="monotone" dataKey='temp' name='Ist' unit="°C" stroke="#8884d8" />
      <Line yAxisId="left" type="monotone" dataKey='feels_like' name='Gefühlte' unit="°C" stroke="#82ca9d"/>
    </ComposedChart>
  </ResponsiveContainer>
  );
}