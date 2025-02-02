export default async (request, context) => {
  const apiKey = process.env.WEATHER_API_KEY; // Replace with your actual API key
  const city = "Montreal"; // You can modify this to accept a dynamic city
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    // Fetch weather data from the external API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const temperature = data.current.temp_c; // Get the temperature in Celsius

    return new Response(
      JSON.stringify({
        temperature: temperature,
        city: data.location.name,
        country: data.location.country,
        condition: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch weather data",
        message: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
