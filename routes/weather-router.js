const express = require('express');
const router = express.Router();
const controller = require('../controllers/weather-controller');
const { param } = require('express-validator');

router.get('/weather/:city', controller.getCurrentWeather);

router.get('/statistics/:city/:period', [
  param('period', 'stateCode must be number').isIn(['day', 'week', 'month']),
], controller.getStatistics);

module.exports = router;