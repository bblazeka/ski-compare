import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';


export default function CustomPieChart(props: any) {
  const { division, title } = props;
  var colors = ["#82ca9d", "#8884d8", "#ffc658"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: { cx: number, cy: number, midAngle: number, innerRadius: number, outerRadius: number, percent: number, index: number }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h4>{title}</h4>
      <div style={{ width: '25vw', height: '25vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={division}
              labelLine={false}
              label={renderCustomizedLabel}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {division.map((_entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align='right' verticalAlign='middle' />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}