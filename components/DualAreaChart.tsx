import React from 'react';
import { AreaChart, Area, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

type DualAreaChartProps = {
  data: any[],
  unit: string
}

export default function DualAreaChart({ data, unit = "€" }: DualAreaChartProps) {

  return (
    <ResponsiveContainer width="100%" height="100%">
    <AreaChart width={730} height={250} data={data}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis unit={unit} />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Area type="monotone" dataKey="temp" name="Ist" unit={unit} stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
      <Area type="monotone" dataKey="feels_like" name="Gefühlte" unit={unit} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
    </AreaChart>
  </ResponsiveContainer>
  );
}