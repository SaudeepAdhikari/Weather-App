import React from 'react';
import { motion } from 'framer-motion';

export default function WeatherCard({ weather, dateBuilder }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="location-box">
        <div className="location">{weather.name}, {weather.sys.country}</div>
        <div className="date">{dateBuilder(new Date())}</div>
      </div>
      <div className="weather-box">
        <div className="temp">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather">
          {weather.weather[0].main}
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ verticalAlign: 'middle', marginLeft: '10px' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
