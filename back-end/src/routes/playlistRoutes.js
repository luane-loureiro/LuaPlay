/**
 * @swagger
 * tags:
 *   name: Playlists
 *   description: Gerenciamento de playlists do usuário
 */

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Listar playlists do usuário autenticado
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de playlists
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: Criar uma nova playlist
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Playlist criada com sucesso
 *       400:
 *         description: Erro na criação
 */

/**
 * @swagger
 * /playlists/{id}/media:
 *   post:
 *     summary: Adicionar mídia a uma playlist existente
 *     tags: [Playlists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da playlist
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mediaId
 *             properties:
 *               mediaId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mídia adicionada à playlist com sucesso
 *       400:
 *         description: Erro na adição da mídia
 *       404:
 *         description: Playlist ou mídia não encontrada
 */

const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, playlistController.listPlaylists);
router.post('/', authMiddleware, playlistController.createPlaylist);
router.post('/:id/media', authMiddleware, playlistController.addMediaToPlaylist);

module.exports = router;
