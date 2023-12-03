class WeatherService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeatherData(lat, lng) {
    try {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.apiKey}&units=metric`;
      const response = await axios.get(weatherUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw new Error("Unable to fetch weather data");
    }
  }
}

module.exports = WeatherService;
