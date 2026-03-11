const express = require('express');
const { listUsers, createUser } = require('../controllers/userController');
const { requireAuth, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Listar usuarios
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *   post:
 *     tags: [Users]
 *     summary: Crear usuario
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserRequest'
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.get('/', listUsers);
router.post('/', createUser);

module.exports = router;
