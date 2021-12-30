const weatherService = require('../services/weather-service');


class weatherController {
  async getCurrentWeather(req, res) {
    try {
      const { city } = req.params;

      const currentWeather = await weatherService.getCurrentWeather(city);

      return res.json(currentWeather);
    } catch (e) {
      console.log(e.message);

      return e.isAxiosError ?
        res.status(e.response.status).json({ message: e.response.data.message }) :
        res.status(500).json({ message: 'Server error' });
    }
  }

  async getStatistics(req, res) {
    try {
      const { city, period } = req.params;

      const statistics = await weatherService.getStatistics({ city, period });

      return res.json(statistics);
    } catch (e) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

module.exports = new weatherController();