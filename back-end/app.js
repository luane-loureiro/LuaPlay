const express = require('express');
const app = express();

const authRoutes = require('./src/routes/authRoutes');
const mediaRoutes = require('./src/routes/mediaRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/media', mediaRoutes);
app.use('/playlists', playlistRoutes);

app.get('/', (req, res) => {
  res.send('API Streaming - OK');
});

module.exports = app;
