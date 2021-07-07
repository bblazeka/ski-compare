import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BarChart, Bar, Legend, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import _ from 'lodash';
import CustomPieChart from './CustomPieChart';
import DualAreaChart from './DualAreaChart';
import SavingsAreaChart from './SavingsAreaChart';
import { Transaction } from '../common/types';

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

  var currentSummary = data.summaries[activeMonth];
  var division = Object.entries(currentSummary).map(([key, value]) => { return { name: key, value } }).filter(el => el.name !== 'ind' && el.name !== 'name' && el.name !== 'transactions');
  return (
    <div style={{ width: '100%' }}>
      <h3>Einkommen und Ausgaben pro Monat</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={data.income} unit="€" />
      </div>
      <h3>Ausgaben pro Monat</h3>
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
            {data.categories.map((cat: any, i: number) => {
              return (<Bar key={i} dataKey={cat.name.toLowerCase()} name={cat.name} unit="€" stackId="a" fill={cat.color} onClick={(data, index) => setActiveMonth(index)} />);
            })}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ width: '100%', height: '30vh' }}>
        <CustomPieChart title={"Ausgabenübersicht " + currentSummary.name} division={division} categories={data.categories} />
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell>Gruppe</TableCell>
              <TableCell align="right">Betrag&nbsp;(€)</TableCell>
              <TableCell>Beschreibung</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.transactions.filter((trans: Transaction) => (new Date(trans.date)).getMonth() === activeMonth).map((t: Transaction, i: number) => (
              <TableRow key={'transaction' + i}>
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
      <h3>Sparen pro Monat</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <SavingsAreaChart savings={data.savings} xAxisKey="month" unit="€" />
      </div>
    </div>
  );
}