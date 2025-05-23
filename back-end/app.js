require('dotenv').config();
const express = require('express');
const app = express();

const { swaggerUi, specs } = require('./swagger');


const authRoutes = require('./src/routes/authRoutes');
const playlistRoutes = require('./src/routes/playlistRoutes');
const mediaRoutes = require('./src/routes/mediaRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/medias', mediaRoutes);
app.use('/categories', categoryRoutes);

module.exports = app;