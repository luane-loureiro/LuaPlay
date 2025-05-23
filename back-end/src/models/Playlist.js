const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
});

playlistSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Playlist', playlistSchema);