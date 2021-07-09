import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import styles from '../styles/ProgressReport.module.css';

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
    <div className={styles.container}>
      <div>
        <div className={styles.progress} >
          <CircularProgress size={150} variant="determinate" value={progress} />
          <div className={styles.circle} >
            <Typography variant="h4" component="div" color="textSecondary">{status.progress.toFixed(1)}</Typography>
            <Typography variant="subtitle1" component="div" color="textSecondary">
              {status.subtitle}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}