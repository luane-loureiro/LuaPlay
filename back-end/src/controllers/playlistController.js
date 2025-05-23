const Playlist = require('../models/Playlist');
const Media = require('../models/Media');
const Category = require('../models/Category');

async function findOrCreateCategoryByIdOrName(categoryIdOrName) {
  if (!categoryIdOrName) return null;

  if (/^[0-9a-fA-F]{24}$/.test(categoryIdOrName)) {
    const catById = await Category.findById(categoryIdOrName);
    if (catById) return catById;
  }

  let category = await Category.findOne({ name: categoryIdOrName });
  if (!category) {
    category = new Category({ name: categoryIdOrName });
    await category.save();
  }
  return category;
}

// LISTAR playlists do usuário
exports.listPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id });
    res.status(200).json(playlists);
  } catch (error) {
    console.error('Erro ao listar playlists:', error);
    res.status(500).json({ message: 'Erro ao listar playlists' });
  }
};

// Criar nova playlist
exports.createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Nome é obrigatório' });

    // Verificar se já existe playlist com esse nome para o usuário
    const exists = await Playlist.findOne({ name, user: req.user.id });
    if (exists) return res.status(400).json({ message: 'Nome da playlist já existe para este usuário' });

    const playlist = new Playlist({ name, description, user: req.user.id });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    console.error('Erro ao criar playlist:', err);
    res.status(500).json({ message: 'Erro ao criar playlist' });
  }
};

// Listar mídias de uma playlist pelo nome da playlist (único por usuário)
exports.getMediasFromPlaylistByName = async (req, res) => {
  try {
    const playlistName = req.params.name;

    // Buscar playlist pelo nome e usuário
    const playlist = await Playlist.findOne({ name: playlistName, user: req.user.id });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada ou não pertence ao usuário' });
    }

    // Buscar mídias associadas
    const medias = await Media.find({ playlist: playlist._id }).populate('category', 'name');

    res.status(200).json(medias);
  } catch (error) {
    console.error('Erro ao buscar mídias da playlist:', error);
    res.status(500).json({ message: 'Erro ao buscar mídias da playlist' });
  }
};

// Listar mídias de uma playlist específica do usuário pelo id (se precisar)
exports.getMediasFromPlaylist = async (req, res) => {
  try {
    const playlistId = req.params.id;

    const playlist = await Playlist.findOne({ _id: playlistId, user: req.user.id });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist não encontrada ou não pertence ao usuário' });
    }

    const medias = await Media.find({ playlist: playlistId }).populate('category', 'name');

    res.status(200).json(medias);
  } catch (error) {
    console.error('Erro ao buscar mídias da playlist:', error);
    res.status(500).json({ message: 'Erro ao buscar mídias da playlist' });
  }
};

// Deleta uma playlist pelo nome (somente do usuário autenticado)
exports.deletePlaylistByName = async (req, res) => {
  try {
    const { name } = req.params;
    const deleted = await Playlist.findOneAndDelete({
      name,
      user: req.user.id,
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Playlist não encontrada' });
    }
    res.json({ message: 'Playlist deletada com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar playlist:', err);
    res.status(500).json({ message: 'Erro ao deletar playlist' });
  }
};
