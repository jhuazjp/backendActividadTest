const express = require('express');
const { listLeads, updateLead } = require('../controllers/leadController');
const { requireAuth, requireAdmin } = require('../middlewares/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

/**
 * @swagger
 * /api/leads:
 *   get:
 *     tags: [Leads]
 *     summary: Listar leads
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de leads
 */
router.get('/', listLeads);

/**
 * @swagger
 * /api/leads/{id}:
 *   patch:
 *     tags: [Leads]
 *     summary: Actualizar estado o notas de un lead
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateLeadRequest'
 *     responses:
 *       200:
 *         description: Lead actualizado
 */
router.patch('/:id', updateLead);

module.exports = router;
