import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const cities = {
  'Seoul': { lat: 37.5665, lon: 126.9780 },
  'Tokyo': { lat: 35.6895, lon: 139.6917 },
  'Osaka': { lat: 34.6937, lon: 135.5023 },
  'Fukuoka': { lat: 33.5902, lon: 130.4017 },
  'Taipei': { lat: 25.0330, lon: 121.5654 },
  'Shanghai': { lat: 31.2304, lon: 121.4737 },
  'Beijing': { lat: 39.9042, lon: 116.4074 },
  'Singapore': { lat: 1.3521, lon: 103.8198 },
};

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('Fukuoka');
  const [changedCity, setChangedCity] = useState('Fukuoka'); // Add state for changed city [NEXT_HW_22
  const [startDate, setStartDate] = useState('2024-07-04');
  const [endDate, setEndDate] = useState('2024-07-06');
  const [change, setChange] = useState(false);
  useEffect(() => {
    console.log(process.env.REACT_APP_OPENWEATHER_API_KEY)
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const { lat, lon } = cities[city];
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast',
          {
            params: {
              lat,
              lon,
              appid: process.env.REACT_APP_OPENWEATHER_API_KEY, // Replace 'YOUR_API_KEY' with your actual API key
              units: 'metric'
            }
          }
        );
        const filteredData = response.data.list.filter(weather => {
          const date = new Date(weather.dt_txt);
          return date >= new Date(startDate) && date <= new Date(endDate);
        });
        setChangedCity(city)
        setWeatherData(filteredData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [change]);

  return (
    <div className="App">
      <h1>{changedCity} 지역 날씨 예보!!</h1>
      {changedCity === 'Fukuoka' && <h2>Tmi: 배연준은 7/4-7/6 후쿠오카로 떠남</h2>}
      <div>
        <label>
          Select City:
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            {Object.keys(cities).map(cityName => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={() => setChange(!change)}>Change</button>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Temperature (°C)</th>
              <th>Weather Description</th>
              <th>Weather icon</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((weather, index) => (
              <tr key={index}>
                <td>{new Date(weather.dt_txt).toLocaleString()}</td>
                <td>{weather.main.temp} °C</td>
                <td>{weather.weather[0].description}</td>
                <td>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt={weather.weather[0].description}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
