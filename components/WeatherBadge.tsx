import React from 'react';
import Image from 'next/image';
import styles from '../styles/WeatherBadge.module.css';

type WeatherIconProps = {
  icon: string,
  description: string
}

export default function WeatherIcon({ icon, description }: WeatherIconProps) {

  return (
    <span className={styles.badge}>
      <Image width={40} height={40} alt={description} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    </span>
  );
}