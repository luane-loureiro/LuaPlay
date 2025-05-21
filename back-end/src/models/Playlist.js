const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
