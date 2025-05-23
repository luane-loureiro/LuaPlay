const Category = require('../models/Category');

// Listar todas as categorias
exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};

// Criar nova categoria
exports.createCategory = async (req, res) => {
  let { name, color, icon } = req.body;

  if (!name || !color) {
    return res.status(400).json({ message: 'Nome e cor da categoria são obrigatórios' });
  }

  name  = name.trim();
  color = color.trim();
  const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
  if (!hexColorRegex.test(color)) {
    return res.status(400).json({ message: 'Formato de cor inválido. Use hexadecimal, ex: #ff0000' });
  }

  const validNameRegex = /^[a-zA-Z0-9\s]+$/;
  if (!validNameRegex.test(name)) {
    return res.status(400).json({ message: 'Nome inválido. Use apenas letras, números e espaços.' });
  }

  try {
    const existing = await Category.findOne({
      $or: [
        { name:  new RegExp(`^${name}$`,  'i') },
        { color: new RegExp(`^${color}$`, 'i') },
      ]
    });
    if (existing) {
      return res.status(400).json({ message: 'Nome ou cor já existente' });
    }

    const category = new Category({ name, color, icon });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

// Deletar categoria pelo nome (case-insensitive)
exports.deleteCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    // busca e deleta ignorando case
    const category = await Category.findOneAndDelete({
      name: new RegExp(`^${name}$`, 'i')
    });
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    return res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    return res.status(500).json({ message: 'Erro ao deletar categoria' });
  }
};