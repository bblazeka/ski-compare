import React from 'react';
import WeatherBadge from './WeatherBadge';

type LongTermWeatherProps = {
  data: any[]
}

export default function LongTermWeather({ data }: LongTermWeatherProps) {

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {data.map((el: any, index: number) => {
        var date = new Date(el.dt * 1000);
        var month = date.toLocaleString('de', { month: 'short' }).toUpperCase();
        return (<div style={{ display: 'flex', marginLeft: '20px' }} key={`ltweather-${index}`}>
          <div style={{marginRight: '2px'}}>
            <div style={{textAlign:'center'}}>{month}</div>
            <div style={{margin: 'auto', textAlign:'center'}}>{date.getDate()}</div>
          </div>
          <WeatherBadge description={el.weather[0].description} icon={el.weather[0].icon} />
          <div>
            <span>{`${Math.round(el.temp.day)}°C`}</span><br />
            <span style={{fontSize: '0.8em'}}>{el.weather[0].description}</span>
          </div>
        </div>);
      })}

    </div>
  );
}