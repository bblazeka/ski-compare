import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useTranslation } from "react-i18next";
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
  distribution: TPieData[];
  title: string;
};

const useStyles = makeStyles({
  pieChartContainer: {
    minWidth: "25vw",
    height: "25vh",
  },
});

function CustomPieChartLegendFormatter({ value, entry }: any) {
  const { color, payload } = entry;
  return <span style={{ color }}>{payload.catName}</span>;
}

export default function CustomPieChart(props: CustomPieChartProps) {
  const { distribution, title } = props;
  const { t } = useTranslation();
  const classes = useStyles();

  const mappedPieData = mapToPieData(distribution);

  const optionalProps: any = {};

  if (distribution.length > 0 && distribution[0].catName) {
    const renderColorfulLegendText = (value: string, entry: any) => (
      <CustomPieChartLegendFormatter value={value} entry={entry} />
    );
    optionalProps.formatter = renderColorfulLegendText;
  }

  return (
    <>
      {title && <h3>{title}</h3>}
      {distribution.length === 0 && <div>{t("NOT_AVAILABLE")}</div>}
      <div className={classes.pieChartContainer}>
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
      </div>
    </>
  );
}
