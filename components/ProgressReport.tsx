import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AdjustRoundedIcon from '@material-ui/icons/AdjustRounded';
import { Goal } from '../common/types';

type ProgressReportProps = {
  goals: Goal[]
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number, maxValue: number }) {
  let progress = props.value / props.maxValue * 100;
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={200} variant="determinate" value={progress} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        flexWrap="wrap"
        position="absolute"
        display="flex"
        alignItems="center"
        padding="30%"
        justifyContent="center"
      >
        <Typography variant="h4" component="div" color="textSecondary">{`${Math.round(
          progress,
        )}%`}</Typography>
        <Typography variant="subtitle1" component="div" color="textSecondary">
          {`${props.value}€/${props.maxValue}€`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProgressReport({ goals }: ProgressReportProps) {

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {goals.map((g, i) => {
        return (<div key={i}>
          <CircularProgressWithLabel value={g.currentValue} maxValue={g.expectedValue} />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1" component="div" color="textSecondary">{g.name}</Typography>
        </div>)
      })}
    </div>
  );
}