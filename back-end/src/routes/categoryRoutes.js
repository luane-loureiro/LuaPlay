const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authMiddleware   = require('../middlewares/authMiddleware');

// Listar todas as categorias
router.get('/',    authMiddleware, categoryController.listCategories);

// Criar nova categoria
router.post('/',   authMiddleware, categoryController.createCategory);

// Deletar categoria **pelo nome** (único)
router.delete('/:name', authMiddleware, categoryController.deleteCategoryByName);

module.exports = router;