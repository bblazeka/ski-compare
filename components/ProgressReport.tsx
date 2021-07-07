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

type ProgressReportProps = {
  goals: Goal[]
}

type Goal = {
  name: string
  currentValue: number
  expectedValue: number
}

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress size={200} variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function ProgressReport({ goals }: ProgressReportProps) {

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {goals.map((g, i) => {
        return (<div key={i}>
          <CircularProgressWithLabel value={Math.round(g.currentValue / g.expectedValue * 100)} />
          <Typography style={{ textAlign: 'center' }} variant="subtitle1" component="div" color="textSecondary">{g.name}</Typography>
        </div>)
      })}
      <List component="nav" aria-label="secondary mailbox folders">
      {goals.map((g, i) => {
        return (<ListItem key={i+10}>
          <ListItemAvatar>
            <Avatar>
              <AdjustRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={g.name} secondary={g.currentValue +"€/" + g.expectedValue + "€"}/>
        </ListItem>)
      })}
      </List>
    </div>
  );
}