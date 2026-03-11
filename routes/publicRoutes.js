const express = require('express');
const { createPublicLead } = require('../controllers/leadController');

const router = express.Router();

/**
 * @swagger
 * /api/public/leads:
 *   post:
 *     tags: [Public]
 *     summary: Crear lead publico
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PublicLeadRequest'
 *     responses:
 *       201:
 *         description: Lead creado
 */
router.post('/leads', createPublicLead);
router.post('/contact', createPublicLead);

module.exports = router;
