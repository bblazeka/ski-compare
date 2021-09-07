import React from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getColor, mapToPieData } from "./CustomPieChartHelper";
import CustomPieChartLabel from "./CustomPieChartLabel";

type CustomPieChartProps = {
  distribution: PieData[];
  title: string;
};

const CustomPieChartContainerStyled = styled.div`
  min-width: 25vw;
  height: 25vh;
`;

function CustomPieChartLegendFormatter({ value, entry }: any) {
  const { color, payload } = entry;
  return <span style={{ color }}>{payload.catName}</span>;
}

export default function CustomPieChart(props: CustomPieChartProps) {
  const { distribution, title } = props;

  const mappedPieData = mapToPieData(distribution);

  let optionalProps: any = {};

  if (distribution[0].catName) {
    const renderColorfulLegendText = (value: string, entry: any) => (
      <CustomPieChartLegendFormatter value={value} entry={entry} />
    );
    optionalProps.formatter = renderColorfulLegendText;
  }

  return (
    <>
      {title && <h3>{title}</h3>}
      {distribution.length === 0 && <div>Nicht verfügbar.</div>}
      <CustomPieChartContainerStyled>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              dataKey="value"
              nameKey="catName"
              isAnimationActive={false}
              data={mappedPieData}
              labelLine={false}
              label={(props) => <CustomPieChartLabel {...props} />}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
            >
              {distribution.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={getColor(entry, index)} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              {...optionalProps}
            />
          </PieChart>
        </ResponsiveContainer>
      </CustomPieChartContainerStyled>
    </>
  );
}
