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

  return (
    <div style={{ width: '100%' }}>
      <h3>Einkommen und Ausgaben pro Monat</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <DualAreaChart data={data.income} unit="€" />
      </div>
      <h3>Sparen pro Jahr</h3>
      <div style={{ width: '100%', height: '40vh' }}>
        <SavingsAreaChart savings={data.savings} xAxisKey="year" unit="€" />
      </div>
      <h3>Ziele</h3>
      <ProgressReport goals={[{name: 'Grundstück', currentValue: 28000, expectedValue: 50000 }, {name: 'Haus', currentValue: 28000, expectedValue: 200000 }, {name: 'Komplett', currentValue: 28000, expectedValue: 250000 }]} />
    </div>
  );
}