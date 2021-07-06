import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BarChart, AreaChart, Area, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import CustomPieChart from './CustomPieChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    table: {
      minWidth: 650,
    }
  }),
);

export default function Dashboard(props: any) {
  const { data } = props;
  const classes = useStyles();

  const [activeMonth, setActiveMonth] = useState(0);
  
  var currentSummary = data.summaries[activeMonth];
  var division = Object.entries(currentSummary).map(([key, value]) => { return {name: key, value } }).filter(el => el.name !== 'ind' && el.name !== 'name');

  return (
    <div style={{ width: '90%' }}>
      <h3>Income and expenses per month</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart width={730} height={250} data={data.income}
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
            <YAxis unit="€" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="income" name="Einkommen" unit="€" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="expenses" name="Ausgaben" unit="€" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <h3>Expenses per month</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data.summaries}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="€" />
            <Tooltip />
            <Legend />
            <Bar dataKey="wohnen" name="Wohnen" unit="€" stackId="a" fill="#8884d8" onClick={(data, index) => setActiveMonth(index)} />
            <Bar dataKey="lebensmittel" name="Lebensmittel" unit="€" stackId="a" fill="#82ca9d" onClick={(data, index) => setActiveMonth(index)} />
            <Bar dataKey="verkehr" name="Verkehr" unit="€" stackId="a" fill="#ffc658" onClick={(data, index) => setActiveMonth(index)} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '100%', height: '30vh' }}>
      <CustomPieChart title={"Ausgabenübersicht " + currentSummary.name} division={division} />
      </div>
      <h3>Savings per month</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data.savings}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="savings" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Group</TableCell>
              <TableCell align="right">Amount&nbsp;(EUR)</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.transactions.map((t: any, i: number) => (
              <TableRow key={t.date + i}>
                <TableCell component="th" scope="row">
                  {t.date}
                </TableCell>
                <TableCell>{t.group}</TableCell>
                <TableCell align="right">{_.round(t.amount, 2).toFixed(2)}</TableCell>
                <TableCell>{t.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}