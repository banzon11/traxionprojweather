const express = require("express");
const request = require("request");

const router = express.Router();

const googlePlaces = require("googleplaces");

// const apiKey = "8ca7773ea82aaa569289fcd6626e0cd4";

// const client = googlePlaces({ apiKey });
const axios = require("axios");
// Display the main page with the map
router.get("/", (req, res) => {
  res.render("index");
});
// client.placeTextSearch({ query: "restaurants near me" }, (error, results) => {
//   if (error) {
//     console.error("Error:", error);
//     return;
//   }

//   console.log("Places:", results.places);
// });
// Route for getting weather data for a specific location
// router.get("/weather/:location", async (req, res) => {
//   try {
//     const location = req.params.location;
//     const apiKey = process.env.OPENWEATHERMAP_API_KEY;
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

//     request(url, (error, response, body) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).send("Error fetching weather data");
//       }

//       const weatherData = JSON.parse(body);
//       res.render("weather", { weatherData });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
// });

// router.get("/search-locations", async (req, res) => {
//   try {
//     const searchTerm = req.query.searchTerm;
//     const places = await client.placesTextSearch({ query: searchTerm });
//     res.json(places.results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error searching for locations");
//   }
// });

router.get("/weather/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;

  try {
    // Use your own OpenWeatherMap API key
    const apiKey = "7e4d7e696b74d5fce7c9ec53914bc878";
    console.log("API Key:", apiKey);

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
    console.log("Weather URL:", weatherUrl);

    // Fetch weather data
    const response = await axios.get(weatherUrl);
    const weatherData = response.data;

    // Send weather data to the client
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

module.exports = router;
