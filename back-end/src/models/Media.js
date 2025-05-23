const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  url: { type: String, required: true },
  coverUrl: { type: String },
  duration: { type: Number },
  playlist: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist', required: true } 
});

module.exports = mongoose.model('Media', MediaSchema);