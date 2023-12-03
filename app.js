console.log("Server starting...");
const express = require("express");
const ejs = require("ejs");
const routes = require("./routes");
const WeatherService = require("./services/weatherService");
const WeatherController = require("./controllers/weatherController");

const app = express();
const port = process.env.PORT || 3000;

// Use dotenv or a config module to manage environment variables
const apiKey = process.env.OPENWEATHERMAP_API_KEY;

const weatherService = new WeatherService(apiKey);
const weatherController = new WeatherController(weatherService);

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use("/", routes);

app.get("/weather/:lat/:lng", weatherController.getWeather);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
