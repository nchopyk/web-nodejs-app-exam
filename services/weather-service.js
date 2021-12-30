const axios = require('axios');
const config = require('../config');

class WeatherService {
  async getCurrentWeather({ cityName, stateCode, countryCode }) {
    stateCode = stateCode ? `,${stateCode}` : '';
    countryCode = countryCode ? `,${countryCode}` : '';
    const requestUrl = encodeURI(`https://${config.WEATHER_API_URL}?q=${cityName}${stateCode}${countryCode}&appid=${config.WEATHER_API_KEY}&units=metric`);

    const response = await axios({
      method: 'get',
      url: requestUrl,
    });

    return response.data;
  }
}

module.exports = new WeatherService();