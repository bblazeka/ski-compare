import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

type SavingsAreaChartProps = {
  savings: any[],
  xAxisKey: string,
  unit: string
}

export default function SavingsAreaChart({ savings, xAxisKey = "month", unit = "€"}: SavingsAreaChartProps) {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={savings}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis unit={unit} />
        <Tooltip />
        <Area type="monotone" dataKey="savings" name="Sparen" stroke="#8884d8" fill="#8884d8" unit={unit} />
      </AreaChart>
    </ResponsiveContainer>
  );
}