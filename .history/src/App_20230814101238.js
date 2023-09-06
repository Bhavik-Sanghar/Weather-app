import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundClass, setBackgroundClass] = useState('');

  const API_KEY = 'e20ef824ca07d082e00b76746ec9a402'; // Replace with your own API key

  useEffect(() => {
    updateBackground();
  }, [weatherData]);

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const updateBackground = () => {
    if (!weatherData) return;

    const weatherCode = weatherData.weather[0].id;
    let className = '';

    if (weatherCode >= 200 && weatherCode < 300) {
      className = 'thunderstorm';
    } else if (weatherCode >= 300 && weatherCode < 600) {
      className = 'rain';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      className = 'snow';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      className = 'atmosphere';
    } else if (weatherCode === 800) {
      className = 'clear-sky';
    } else {
      className = 'clouds';
    }

    setBackgroundClass(className);
  };

  return (
    <div className={`weather-outer-container ${backgroundClass}`}>
            <div className="weather-inner-container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          className="input"
        />
        <button type="submit" className="btn">
          Get Weather
        </button>
      </form>

      {weatherData && (
        <div className="weather-info">
          <h2 className="city-name">{weatherData.name}</h2>
          <div className="weather-details">
            <div className="weather-block">
              <p className="temperature">{weatherData.main.temp}°C</p>
              <p className="description">{weatherData.weather[0].description}</p>
            </div>
            <div className="weather-block">
              <p className="highlight">Humidity: {weatherData.main.humidity}%</p>
              <p className="highlight">Wind Speed: {weatherData.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Weather;
