import React from 'react';
import Image from 'next/image'
import _ from 'lodash';

type WeatherIconProps = {
  icon: string,
  description: string
}

export default function WeatherIcon({ icon, description }: WeatherIconProps) {

  return (
    <span style={{ marginTop: 'auto', marginLeft: '2px', marginRight: '2px', backgroundColor: 'lightblue', borderRadius: '18px' }}>
      <Image width={40} height={40} alt={description} src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
    </span>
  );
}