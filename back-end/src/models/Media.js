const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String },
  url: { type: String, required: true },
  coverUrl: { type: String },
  duration: { type: Number }
});

module.exports = mongoose.model('Media', MediaSchema);