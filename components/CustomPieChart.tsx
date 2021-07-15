import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Category } from '../common/types';

type CustomPieChartProps = {
  categories?: Category[],
  distribution: any[],
  title: string,
  useManual: boolean
}

const colors:any[] = ['#1F77B4','#FF851A','#2CA02C','#D62728','#9467BD','#8C564B','#E377C2'];

export default function CustomPieChart(props: CustomPieChartProps) {
  const { categories, distribution, title, useManual } = props;

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

  var getColor = (entry:any, index: number) => {
    if (categories == null) {
      return colors[index%colors.length];
    }
    else {
      return categories.filter((cat: any) => cat.key?.toLowerCase() === entry.name)[0].color;
    }
  };
  var groupDistribution = distribution.map((el)=> {
    return Object.assign(el, {catName:  categories?.filter((cat: any) => cat.key?.toLowerCase() === el.name)[0].name, id: el.name})
  })

  const renderColorfulLegendText = (value: string, entry: any) => {
    const { color, payload } = entry;
  
    return <span style={{ color }}>{payload.catName}</span>;
  };
  return (
    <div>
      {title && <h3>{title}</h3>}
      <div style={{ minWidth: '25vw', height: '25vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              nameKey='catName'
              isAnimationActive={false}
              data={groupDistribution}
              labelLine={false}
              label={renderCustomizedLabel}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {distribution.map((entry: any, index: number) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getColor(entry, index)} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="vertical" align='right' verticalAlign='middle' formatter={useManual ? renderColorfulLegendText : undefined} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}