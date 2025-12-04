import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { formatDate, formatTemp } from './helpers';
import { Cloud, Sun, Wind } from 'lucide-react';

const Forecast = () => {
  const { forecast, unit } = useContext(WeatherContext);

  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast-section animate-slide-up">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day) => {
          let weatherIcon;
          if (day.weather[0].main === 'Clear') {
            weatherIcon = <Sun size={32} stroke="#FFD700" fill="#FFD700" />;
          } else if (day.weather[0].main === 'Wind') {
            weatherIcon = <Wind size={36} stroke="#4A5568" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))' }} />;
          } else if (day.weather[0].main === 'Clouds') {
            weatherIcon = <Cloud size={32} stroke="#A0AEC0" fill="#A0AEC0" />;
          } else {
            weatherIcon = (
              <img 
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                alt={day.weather[0].main} 
              />
            );
          }

          return (
            <div key={day.dt} className="forecast-card">
              <p className="day-name">{formatDate(day.dt)}</p>
              {weatherIcon}
              <p className="forecast-temp">
                <span className="high">{formatTemp(day.main.temp_max, unit)}</span>
                <span className="low">{formatTemp(day.main.temp_min, unit)}</span>
              </p>
              <p className="desc-sm">{day.weather[0].main}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;