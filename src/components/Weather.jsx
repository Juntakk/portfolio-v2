import React, { useState, useEffect } from "react";
import { TfiControlShuffle } from "react-icons/tfi";
import { BiLoaderCircle } from "react-icons/bi";

import "./styles/weather.css";

const cities = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Berlin",
  "Sydney",
  "Toronto",
  "Dubai",
  "Cairo",
  "Madrid",
  "Hong Kong",
  "Bangkok",
  "Istanbul",
  "Rome",
  "Moscow",
  "Mumbai",
  "Montpellier",
];

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [city, setCity] = useState("Montréal");
  const [isVisible, setIsVisible] = useState(false);

  const apiUrl = "/.netlify/functions/weather"; // Netlify automatically serves functions from this path

  // Fetch weather data along with the timezone and local time
  const fetchWeatherData = async (selectedCity = city) => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}?city=${selectedCity}`);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
      setCity(selectedCity);

      // Trim off the date part and update time
      const localTime = data.location.localtime.split(" ")[1]; // Extract time part from "YYYY-MM-DD HH:mm"
      setCurrentTime(localTime);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []); // Runs only once when component is mounted

  useEffect(() => {
    const handleScroll = () => {
      const windowY = window.scrollY;
      const headerHeight = document.getElementById("header").offsetHeight;
      console.log(headerHeight);

      if (windowY > headerHeight && window.innerWidth > 1025) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const getRandomCity = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    fetchWeatherData(randomCity);
  };

  if (loading) {
    return (
      <>
        <div className="weather-container">
          <div className="loading">
            <BiLoaderCircle />
          </div>
          <span className="shuffle">
            &nbsp;
            <TfiControlShuffle size={30} onClick={getRandomCity} />
          </span>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="weather-container">
          <div className="error">
            <BiLoaderCircle />
          </div>
          <span className="shuffle">
            &nbsp;
            <TfiControlShuffle size={26} onClick={getRandomCity} />
          </span>
        </div>
      </>
    );
  }

  return (
    <div className={`weather-container${isVisible ? " hide" : ""}`}>
      <div className="weather-details">
        <p className="city">{city}</p>
        <p className="temperature">{weatherData.current.temp_c}°C</p>
        <p className="time">{currentTime}</p>
      </div>
      <span className="shuffle hover-this">
        &nbsp;
        <TfiControlShuffle size={26} onClick={getRandomCity} />
      </span>
    </div>
  );
};

export default Weather;
