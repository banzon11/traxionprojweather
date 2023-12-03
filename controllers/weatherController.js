const WeatherService = require("../services/weatherService");

class WeatherController {
  constructor(weatherService) {
    this.weatherService = weatherService;
  }

  async getWeather(req, res) {
    try {
      const { lat, lng } = req.params;
      const weatherData = await this.weatherService.getWeatherData(lat, lng);
      res.json(weatherData);
    } catch (error) {
      console.error("Error in WeatherController:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = WeatherController;
