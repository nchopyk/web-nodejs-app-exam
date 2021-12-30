const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const weatherRouter = require('./routes/weather-router');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', weatherRouter);

app.get('*', function(req, res){
  res.status(404).send('Page not found...');
});

const start = async () => {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    app.listen(config.PORT, () => {
      console.log('Server started on port', config.PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

start();