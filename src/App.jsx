import React, { useState } from 'react';
import './App.css';

import SearchBox from './components/Searchbox';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loader from './components/Loader';

const api = {
  key: "497083b2d66a2eab085b439108fbdc0c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = evt => {
    if (evt.key === 'Enter') {
      setLoading(true);
      setError('');

      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          if (result.cod === "404") {
            setError('City not found!');
            setWeather({});
            setForecast([]);
          } else {
            setWeather(result);
            fetchForecast(result.coord.lat, result.coord.lon);
          }
          setLoading(false);
          setQuery('');
        })
        .catch(() => {
          setError('Network Error!');
          setLoading(false);
        });
    }
  }

  const fetchForecast = (lat, lon) => {
    fetch(`${api.base}forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(data => {
        const dailyData = data.list.filter(item => item.dt_txt.includes('12:00:00'));
        setForecast(dailyData);
      });
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', width: '100%' }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '2px',
          marginBottom: 18,
          textShadow: '0 2px 12px #0005',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          
        }}>Weather App</h1>
        <SearchBox query={query} setQuery={setQuery} search={search} />
        <Loader loading={loading} error={error} />
        {typeof weather.main != "undefined" && !loading && (
          <>
            <WeatherCard weather={weather} dateBuilder={dateBuilder} />
            <Forecast forecast={forecast} />
          </>
        )}
        <footer style={{
          marginTop: 32,
          color: '#fff',
          opacity: 0.7,
          fontSize: 14,
          textAlign: 'center',
          width: '100%'
        }}>
          &copy; {new Date().getFullYear()} Saudeep Adhikari 
        </footer>
      </main>
    </div>
  );
}

export default App;
