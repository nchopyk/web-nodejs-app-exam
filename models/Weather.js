const { Schema, model, ObjectId } = require('mongoose');


const Weather = new Schema({
  forecast: { type: Object, required: true },
  city: { type: ObjectId, ref: 'City' },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = model('Weather', Weather);