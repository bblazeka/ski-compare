import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import CustomPieChart from './CustomPieChart';
import DualAreaChart from './DualAreaChart';
import ProgressIndicator from './ProgressIndicator';
import TitleContainer from './TitleContainer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    }
  }),
);

export default function Dashboard(props: any) {
  const { data } = props;
  const classes = useStyles();

  const [activeSkiResort, setactiveSkiResort] = useState(0);

  var currentSkiResort = data.skiResorts[activeSkiResort];
  var division = Object.entries(currentSkiResort.pistes).map(([key, value]) => { return { name: key, value } }).filter(el => ['easy', 'hard', 'medium'].includes(el.name));
  return (
    <div style={{ width: '90%' }}>
      <h3>Skigebiet vergleich</h3>
      <div style={{ width: '100%', height: '30vh' }}>
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
              return (<Bar key={i} dataKey={"pistes." + cat.name.toLowerCase()} name={cat.name} unit="km" stackId="a" fill={cat.color} onClick={(data, index) => setactiveSkiResort(index)} />);
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <TitleContainer resort={currentSkiResort} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <h3>Beliebt</h3>
          <ProgressIndicator status={{ 'name': currentSkiResort.name, 'progress': currentSkiResort.pistes.rating, 'subtitle': currentSkiResort.pistes.count }} />
        </div>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <CustomPieChart title="Pistenübersicht" division={division} categories={data.skiCategories} />
        </div>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <CustomPieChart title="Liftenübersicht" division={currentSkiResort.pistes.lifts} />
        </div>
      </div>
      <h3>Temperatur in 48 Stunden</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={data.skiResorts[activeSkiResort].weather.hourly} unit="°C" primaryProperty="temp" secondaryProperty="feels_like" primaryPropName="Ist" secondaryPropName="Gefühlte" />
      </div>
      <h3>Wind in 48 Stunden</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={data.skiResorts[activeSkiResort].weather.hourly} unit="kn" secondaryProperty="wind_speed" primaryProperty="wind_gust" secondaryPropName="Geschwindigkeit" primaryPropName="Windböe" />
      </div>
    </div>
  );
}