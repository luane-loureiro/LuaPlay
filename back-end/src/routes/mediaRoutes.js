const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const auth = require('../middlewares/authMiddleware');

// Listar todas as mídias do usuário
router.get('/', auth, mediaController.listMedias);

// Criar nova mídia (usando title como chave única)
router.post('/', auth, mediaController.createMedia);

// Deletar mídia pelo título
router.delete('/:title', auth, mediaController.deleteMediaByName);

module.exports = router;