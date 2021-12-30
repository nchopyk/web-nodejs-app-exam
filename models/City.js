const { Schema, model, ObjectId } = require('mongoose');


const City = new Schema({
  name: { type: String, required: true, unique: true },
  weatherForecasts: [{ type: ObjectId, ref: 'Weather' }],
  updatedAt: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() }
});

module.exports = model('City', City);