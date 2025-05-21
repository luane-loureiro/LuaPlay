/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Gerenciamento de mídias (músicas, vídeos, etc)
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Listar todas as mídias do usuário autenticado
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de mídias
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Criar uma nova mídia
 *     tags: [Media]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - url
 *             properties:
 *               title:
 *                 type: string
 *               url:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mídia criada com sucesso
 *       400:
 *         description: Erro na criação
 */

const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, mediaController.listMedia);
router.post('/', authMiddleware, mediaController.createMedia);

module.exports = router;
