import React from 'react';
import { motion } from 'framer-motion';

export default function Forecast({ forecast }) {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-cards">
        {forecast.map((item, index) => (
          <motion.div
            key={index}
            className="forecast-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <div>{new Date(item.dt_txt).toLocaleDateString()}</div>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <div>{Math.round(item.main.temp)}°C</div>
            <div>{item.weather[0].main}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
