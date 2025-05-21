const Playlist = require('../models/Playlist');
const Media = require('../models/Media');

exports.listPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate('medias');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};

exports.createPlaylist = async (req, res) => {
  try {
    const { name } = req.body;
    if(!name) return res.status(400).json({ message: 'O nome é obrigatório' });

    const playlist = new Playlist({ name, user: req.user.id, medias: [] });
    await playlist.save();

    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};

exports.addMediaToPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const { mediaId } = req.body;

    const playlist = await Playlist.findOne({ _id: id, user: req.user.id });
    if(!playlist) return res.status(404).json({ message: 'Playlist não encontrada' });

    const media = await Media.findById(mediaId);
    if(!media) return res.status(404).json({ message: 'Media não encontrada' });

    if(!playlist.medias.includes(mediaId)) {
      playlist.medias.push(mediaId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};