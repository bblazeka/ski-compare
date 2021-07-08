import React from 'react';
import Box from '@material-ui/core/Box';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

type Status = {
  progress: number
  subtitle: string
  name: string
}

type ProgressReportProps = {
  status: Status
}

export default function ProgressReport({ status }: ProgressReportProps) {
  let progress = status.progress / 5 * 100;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{position: 'relative', display: 'inline-flex'}} >
          <CircularProgress size={200} variant="determinate" value={progress} />
          <div
            style={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              padding: '30%'
            }}
          >
            <Typography variant="h4" component="div" color="textSecondary">{status.progress.toFixed(1)}</Typography>
            <Typography variant="subtitle1" component="div" color="textSecondary">
              {status.subtitle}
            </Typography>
          </div>
        </div>
        <Typography style={{ textAlign: 'center' }} variant="subtitle1" component="div" color="textSecondary">{status.name}</Typography>
      </div>
    </div>
  );
}