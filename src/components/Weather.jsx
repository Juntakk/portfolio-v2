import React, { useState, useEffect } from "react";
import "./styles/weather.css";
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");

  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Montreal"; // Replace with your desired location
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    const updateTime = () => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    };

    const timeInterval = setInterval(updateTime, 1000);
    return () => clearInterval(timeInterval); // Clean up interval on component unmount
  }, [apiUrl]);

  if (loading) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="weather-container">
      <p className="time">{currentTime}</p>

      <div className="weather-details">
        <p className="temperature">{weatherData.current.temp_c}°C</p>
      </div>
    </div>
  );
};

export default Weather;
