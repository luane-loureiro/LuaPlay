const Media = require('../models/Media');
const Playlist = require('../models/Playlist');
const Category = require('../models/Category');

// Listar todas as mídias do usuário (busca em todas as playlists desse usuário)
exports.listMedias = async (req, res) => {
  try {
    // Primeiro pegamos todas as playlists do usuário
    const playlists = await Playlist.find({ user: req.user.id }).select('_id');
    const playlistIds = playlists.map(p => p._id);

    // Depois buscamos todas as mídias que pertençam a essas playlists
    const medias = await Media.find({ playlist: { $in: playlistIds } })
      .populate('category', 'name')
      .populate('playlist', 'name');

    res.json(medias);
  } catch (err) {
    console.error('Erro listando mídias:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Criar nova mídia (title único por usuário)
exports.createMedia = async (req, res) => {
  try {
    const {
      title,
      url,
      description,
      coverUrl,
      duration,
      categoryIdOrName,
      playlistIdOrName,
    } = req.body;

    if (!title || !url || !categoryIdOrName || !playlistIdOrName) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    // Encontrar playlist pelo ID ou nome, garantindo que pertença ao usuário
    let playlist;
    if (/^[0-9a-fA-F]{24}$/.test(playlistIdOrName)) {
      playlist = await Playlist.findOne({ _id: playlistIdOrName, user: req.user.id });
    } else {
      playlist = await Playlist.findOne({ name: playlistIdOrName, user: req.user.id });
    }
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }

    // Encontrar ou criar categoria
    let category;
    if (/^[0-9a-fA-F]{24}$/.test(categoryIdOrName)) {
      category = await Category.findById(categoryIdOrName);
    } else {
      category = await Category.findOne({ name: categoryIdOrName });
    }
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }

    // Verificar se já existe mídia com esse title nessa playlist
    const exists = await Media.findOne({ title, playlist: playlist._id });
    if (exists) {
      return res.status(400).json({ message: 'Título de mídia já existe nesta playlist' });
    }

    const media = new Media({
      title,
      url,
      description,
      coverUrl,
      duration,
      category: category._id,
      playlist: playlist._id,
    });
    await media.save();

    // Adiciona referência na playlist
    playlist.medias.push(media._id);
    await playlist.save();

    const populated = await media.populate('category', 'name').populate('playlist', 'name');
    res.status(201).json(populated);

  } catch (err) {
    console.error('Erro criando mídia:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};

// Deletar mídia pelo título (se pertencer ao usuário)
exports.deleteMediaByName = async (req, res) => {
  try {
    const { title } = req.params;

    // Encontrar a mídia pelo título
    const media = await Media.findOne({ title }).populate('playlist');
    if (!media) {
      return res.status(404).json({ message: 'Mídia não encontrada' });
    }

    // Verificar propriedade da playlist
    if (media.playlist.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Não autorizado a deletar esta mídia' });
    }

    // Deletar mídia
    await media.deleteOne();

    // Remover da playlist
    await Playlist.findByIdAndUpdate(media.playlist._id, {
      $pull: { medias: media._id }
    });

    res.json({ message: 'Mídia deletada com sucesso' });
  } catch (err) {
    console.error('Erro deletando mídia:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
};
