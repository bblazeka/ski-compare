import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import CustomPieChart from './CustomPieChart';
import DualAreaChart from './DualAreaChart';
import ProgressReport from './ProgressReport';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    }
  }),
);

export default function DetailDashboard(props: any) {
  const { data } = props;
  const classes = useStyles();

  const [activeMonth, setActiveMonth] = useState(0);

  var currentSummary = data.skiResorts[activeMonth];
  var division = Object.entries(currentSummary.pistes).map(([key, value]) => { return { name: key, value } }).filter(el => ['easy', 'hard', 'medium'].includes(el.name));
  return (
    <div style={{ width: '100%' }}>
      <h3>Actual and feels like</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={data.skiResorts[0].weather.hourly} unit="°C" />
      </div>
      <h3>Skigebiet vergleich</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.skiResorts}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="km" />
            <Tooltip />
            <Legend />
            {data.skiCategories.map((cat: any, i: number) => {
              return (<Bar key={i} dataKey={"pistes."+cat.name.toLowerCase()} name={cat.name} unit="km" stackId="a" fill={cat.color} onClick={(data, index) => setActiveMonth(index)} />);
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h3>Beliebt</h3>
      <ProgressReport status={{'name': currentSummary.name, 'progress': currentSummary.pistes.rating, 'subtitle': currentSummary.pistes.count}} />
      <div style={{ width: '100%', height: '30vh' }}>
        <CustomPieChart title={"Pistenübersicht " + currentSummary.name} division={division} categories={data.skiCategories} />
      </div>
    </div>
  );
}