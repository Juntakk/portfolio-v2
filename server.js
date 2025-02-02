const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import the CORS package
require("dotenv").config();

const app = express();
const port = 5000;

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const apiKey = process.env.WEATHER_API_KEY;
const city = "Montreal";

// Weather API route
app.get("/weather", async (req, res) => {
  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await axios.get(apiUrl);
    res.json(response.data); // Send the weather data to the frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
    console.log("Weather API Error:", error); // Log the error for debugging
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
