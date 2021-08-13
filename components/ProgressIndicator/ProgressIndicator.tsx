import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import styles from './ProgressIndicator.module.css';

type Status = {
  progress: number
  subtitle: string
  name: string
}

type ProgressIndicatorProps = {
  title: string
  status: Status
}

export default function ProgressIndicator({ title, status }: ProgressIndicatorProps) {
  const progress = status.progress / 5 * 100;
  return (
    <>
      {title && <h3 role='title'>{title}</h3>}
      <div className={styles.container}>
        <>
          <div className={styles.progress} >
            <CircularProgress style={{margin: 'auto'}} size={150} variant="determinate" value={progress} />
            <div className={styles.circle} >
              <Typography variant="h4" component="div" color="textSecondary">{status.progress.toFixed(1)}</Typography>
              <Typography variant="subtitle1" component="div" color="textSecondary">
                {status.subtitle}
              </Typography>
            </div>
          </div>
        </>
      </div>
    </>
  );
}