const Media = require('../models/Media');

exports.listMedia = async (req, res) => {
  try {
    const medias = await Media.find();
    res.json(medias);
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};

exports.createMedia = async (req, res) => {
  try {
    const { title, artist, url, coverUrl, duration } = req.body;
    if(!title || !url) return res.status(400).json({ message: 'Título e URL obrigatórios' });

    const media = new Media({ title, artist, url, coverUrl, duration });
    await media.save();

    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};