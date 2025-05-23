/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: API para gerenciar categorias
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - color
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único da categoria
 *           example: "641d1234abcd5678ef901234"
 *         name:
 *           type: string
 *           description: Nome da categoria
 *           example: "Filmes"
 *         color:
 *           type: string
 *           description: Cor associada à categoria (em hex, rgb, etc.)
 *           example: "#ff0000"
 *         icon:
 *           type: string
 *           description: URL ou nome do ícone da categoria
 *           example: "film"
 *   requestBodies:
 *     CreateCategory:
 *       description: Dados para criar uma nova categoria
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Filmes"
 *               color:
 *                 type: string
 *                 example: "#ff0000"
 *               icon:
 *                 type: string
 *                 example: "film"
 */

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Listar todas as categorias cadastradas
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Erro ao buscar categorias
 */

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateCategory'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Nome ou cor obrigatórios ou inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro ao criar categoria
 */

/**
 * @openapi
 * /categories/{name}:
 *   delete:
 *     summary: Deletar categoria pelo nome (case-insensitive)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome da categoria a ser deletada
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       500:
 *         description: Erro ao deletar categoria
 */
