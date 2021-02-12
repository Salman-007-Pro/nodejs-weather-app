const axios = require("axios");

const weather = axios.create({
  baseURL: "http://api.weatherstack.com",
  params: {
    access_key: "20e3a73ade76c3f944777c8d94d5406d",
  },
});

const getForecastWeather = async (lat, lon, callback) => {
  try {
    const { data } = await weather.get("/forecast", {
      params: {
        query: `${lat},${lon}`,
      },
    });
    if (!data.request) {
      throw "Unable to find location. try another search";
    }
    const { current } = data;
    callback(
      undefined,
      current.weather_descriptions +
        " It is currently " +
        current.temperature +
        " degress out. There is a " +
        current.precip +
        "% chance of rain."
    );
  } catch (err) {
    callback(err);
  }
};

module.exports = getForecastWeather;
