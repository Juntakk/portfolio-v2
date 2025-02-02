const axios = require("axios");

exports.handler = async (event, context) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const city = "Montreal"; // Replace with dynamic city if needed
  try {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Weather API Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to fetch weather data",
        details: error.message,
      }),
    };
  }
};
