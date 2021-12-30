const axios = require('axios');
const config = require('../config');
const City = require('../models/City');
const Weather = require('../models/Weather');


class WeatherService {
  async getCurrentWeather(cityName) {

    const existingCity = await City.findOne({ name: cityName });


    if (!existingCity) {
      return this._createCityWithWeather(cityName);
    }

    const forecasts = await Weather.find({ city: existingCity._id }).sort({ createdAt: -1 });
    const latestForecast = forecasts[0];

    if (this._diffHours(latestForecast.createdAt, new Date()) <= 2) {
      return latestForecast.forecast;
    } else {
      return this._updateCityWeather(existingCity);
    }
  }

  async _createCityWithWeather(cityName) {
    const newCity = new City({ name: cityName });

    const forecast = await this._getForecastFromApi(cityName);
    const weather = new Weather({ forecast, city: newCity._id, createdAt: Date.now() });
    newCity.weatherForecasts.push(weather._id);

    await newCity.save();
    await weather.save();

    return forecast;
  }

  async _updateCityWeather(existingCity) {
    const forecast = await this._getForecastFromApi(existingCity.name);
    const weather = new Weather({ forecast, city: existingCity._id, createdAt: Date.now() });
    existingCity.weatherForecasts.push(weather._id);

    await existingCity.save();
    await weather.save();

    return forecast;
  }

  _diffHours(dt2, dt1) {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
  }

  async _getForecastFromApi(cityName) {
    const requestUrl = encodeURI(`https://${config.WEATHER_API_URL}?q=${cityName}&appid=${config.WEATHER_API_KEY}&units=metric`);

    const response = await axios({
      method: 'get',
      url: requestUrl,
    });

    const { data: responseData } = response;

    return responseData;
  }
}

module.exports = new WeatherService();