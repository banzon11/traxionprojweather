const WeatherService = require("../../src/services/weatherService");

describe("WeatherService", () => {
  const mockApiKey = "mock-api-key";
  const weatherService = new WeatherService(mockApiKey);

  test("getWeatherData successfully fetches data", async () => {
    // Mock the axios.get method
    const mockResponse = { data: { mock: "data" } };
    const axiosGetMock = jest
      .spyOn(weatherService.axios, "get")
      .mockResolvedValue(mockResponse);

    // Call the method to test
    const result = await weatherService.getWeatherData(0, 0);

    // Assertions
    expect(result).toEqual(mockResponse.data);
    expect(axiosGetMock).toHaveBeenCalledWith(
      "https://api.openweathermap.org/data/2.5/weather?lat=0&lon=0&appid=mock-api-key&units=metric"
    );
  });

  test("getWeatherData handles errors gracefully", async () => {
    // Mock an error from axios.get
    const axiosGetMock = jest
      .spyOn(weatherService.axios, "get")
      .mockRejectedValue(new Error("Network error"));

    // Call the method to test
    await expect(weatherService.getWeatherData(0, 0)).rejects.toThrow(
      "Unable to fetch weather data"
    );

    // Assertion
    expect(axiosGetMock).toHaveBeenCalled();

    // Restore the original implementation
    axiosGetMock.mockRestore();
  });
});
