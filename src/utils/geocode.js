const axios = require("axios");

const geoCode = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    access_token:
      "pk.eyJ1Ijoic2FsbWFuLWFzaWYiLCJhIjoiY2tpdnE3NGoyM2E2MDJybGJteDdodmZqZyJ9.mG0O6hcWIvKjsW_tC0CpDg",
    limit: 1,
  },
});
const getCurrentWeather = async (address, callback) => {
  try {
    const { data } = await geoCode.get(`/${address}.json`);
    const [lon, lat] = data.features[0].center;
    const { place_name } = data.features[0];
    callback(undefined, { lon, lat, location: place_name });
  } catch (err) {
    callback("Sorry we could not find the location");
  }
};
module.exports = getCurrentWeather;
