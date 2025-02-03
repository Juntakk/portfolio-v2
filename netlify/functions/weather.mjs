import fetch from "node-fetch";

export default async (request, context) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = new URL(request.url);

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key is missing" }), {
      status: 500,
    });
  }

  const city = url.searchParams.get("city") || "Montréal";
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
