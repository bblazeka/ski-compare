import React, { useContext, useState } from 'react';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import skiCategories from '../utils/categories.json';
import { SkiContext } from 'context/SkiContext';
import { AxisDomain } from 'recharts/types/util/types';

type CompareChartProps = {
}

type CompareMode = {
  id: number,
  name: string,
  unit: string,
  domain: AxisDomain,
  ticks: number[],
  renderBar: any
}

function GetSlopesBars({ onClick }: any) {
  return (skiCategories.map((cat: Category, i: number) => {
    return (<Bar
      key={i}
      dataKey={`slopes.${cat.key?.toLowerCase()}`}
      name={cat.name}
      unit="km"
      stackId="a"
      fill={cat.color}
      onClick={onClick}
    />);
  }));
}

function GetRatingBars({ onClick }: any) {
  return (<Bar
    dataKey='slopes.rating'
    name='Bewertung'
    fill='#1976D2'
    onClick={onClick}
  />);
}

export default function CompareChart(props: CompareChartProps) {
  const [mode, setMode] = useState(0);

  const { skiResorts, setActiveSkiResort } = useContext(SkiContext);

  const barClickHandler = (_data: any, index: any) => setActiveSkiResort(index);

  const modes: CompareMode[] = [
    {
      id: 0,
      name: 'Pisten',
      unit: 'km',
      domain: [0, 'auto'],
      ticks: [],
      renderBar: GetSlopesBars({ onClick: barClickHandler })
    },
    {
      id: 1,
      name: 'Bewertung',
      unit: '',
      domain: [0, 5],
      ticks: [0,1,2,3,4,5],
      renderBar: GetRatingBars({ onClick: barClickHandler })
    }
  ];

  const currentMode = modes[mode];

  return (<>
    <h3>Skigebiet vergleich</h3>
    <div style={{ width: '100%' }}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {modes.map((el, index) => {
          return (<Button key={'button' + index} variant={mode === el.id ? 'contained' : 'outlined'} onClick={() => setMode(el.id)}>{el.name}</Button>);
        })}
      </ButtonGroup>
    </div>
    <div style={{ width: '100%', height: '30vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={skiResorts}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit={currentMode.unit} domain={currentMode.domain} ticks={currentMode.ticks} />
          <Tooltip />
          <Legend />
          {currentMode.renderBar}
        </BarChart>
      </ResponsiveContainer>
    </div></>);
};