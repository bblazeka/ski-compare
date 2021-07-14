import React from 'react';
import Image from 'next/image'
import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';
import styles from '../styles/TitleContainer.module.css';
import WeatherBadge from './WeatherBadge';

type TitleContainerProps = {
  resort: any
}

export default function TitleContainer({ resort }: TitleContainerProps) {

  React.useEffect(() => {
    var fontAwesomeCss = document.querySelector('#font-awesome-css') ?? undefined;
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      fontAwesomeCss as any,
    );

    return () => {
      node.parentNode!.removeChild(node);
    };
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ fontSize: 40, fontWeight: 700 }}>{resort.name}</span>
      <span style={{ fontSize: 30, fontWeight: 400, margin: 'auto 10px 0 10px' }}>{resort.weather.current.weather[0].description}</span>
      <WeatherBadge description={resort.weather.current.weather[0].description} icon={resort.weather.current.weather[0].icon} />
      <span style={{ fontSize: 30, fontWeight: 500, margin: 'auto 10px 0 10px' }}>{resort.weather.current.temp.toFixed(0)}°C</span>
      <div className={styles.statusbar}>
        <span style={{ fontSize: 20 }}>Gefühlte: {resort.weather.current.feels_like.toFixed(0)}°C</span>
        <span style={{ fontSize: 20 }}><Icon className="fas fa-wind" style={{ fontSize: 20 }} /> {resort.weather.current.wind_speed} kn</span>
        <span style={{ fontSize: 20 }}><Icon className="fas fa-snowflake" style={{ fontSize: 20 }} /> {resort.pistes.snow}</span>
        <span style={{ fontSize: 20 }}><Icon className="fas fa-skiing" style={{ fontSize: 20 }} /> {resort.pistes.liftStatus}</span>
      </div>
    </div>
  );
}