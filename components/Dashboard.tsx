import React, { useState } from 'react';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import CustomPieChart from './CustomPieChart';
import DualAreaChart from './DualAreaChart';
import ProgressIndicator from './ProgressIndicator';
import TitleContainer from './TitleContainer';
import TempRainChart from './TempRainChart';
import LongTermWeather from './LongTermWeather';
import ShortTermWeather from './ShortTermWeather';
import { Category } from '../common/types';

export default function Dashboard(props: any) {
  const { data } = props;

  const [activeSkiResort, setactiveSkiResort] = useState(0);
  
  var currentSkiResort = data.skiResorts[activeSkiResort];
  var trackDistribution = Object.entries(currentSkiResort.pistes).map(([key, value]) => { return { name: key, value } }).filter(el => ['easy', 'hard', 'medium'].includes(el.name));
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
            {data.skiCategories.map((cat: Category, i: number) => {
              return (<Bar key={i} dataKey={"pistes." + cat.key.toLowerCase()} name={cat.name} unit="km" stackId="a" fill={cat.color} onClick={(data, index) => setactiveSkiResort(index)} />);
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <TitleContainer resort={currentSkiResort} />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <ProgressIndicator title='Beliebt' status={{ 'name': currentSkiResort.name, 'progress': currentSkiResort.pistes.rating, 'subtitle': currentSkiResort.pistes.count }} />
        </div>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <CustomPieChart title="Pistenübersicht" distribution={trackDistribution} categories={data.skiCategories} useManual={true} />
        </div>
        <div style={{ width: '32%', minWidth: '400px', height: '30vh' }}>
          <CustomPieChart title="Liftenübersicht" distribution={currentSkiResort.pistes.lifts} useManual={false} />
        </div>
      </div>
      <h3>Wettervorhersage für die nächsten 7 Tage</h3>
      <LongTermWeather data={currentSkiResort.weather.daily} />
      <h3>Wettervorhersage für die nächsten 48 Stunden</h3>
      <ShortTermWeather data={currentSkiResort.weather.hourly} />
      <h3>Temperatur und Niederschlag in 48 Stunden</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <TempRainChart data={currentSkiResort.weather.hourly} />
      </div>
      <h3>Wind in 48 Stunden</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={currentSkiResort.weather.hourly} unit="kn" secondaryProperty="wind_speed" primaryProperty="wind_gust" secondaryPropName="Geschwindigkeit" primaryPropName="Windböe" />
      </div>
    </div>
  );
}